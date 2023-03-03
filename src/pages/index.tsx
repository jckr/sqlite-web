import { useState, useEffect } from 'react';
import initSqlJs from 'sql.js';
import { Database, QueryExecResult } from 'sql.js';
import styles from '@/styles/Home.module.css';

import FileInput from '@/components/file-input';
import Results from '@/components/sql-results';
import QueryForm from '@/components/sql-query-form';
import { useAppSelector, useAppDispatch } from '@/slices/hook';
import { Table, setTables } from '@/slices/tables-slice';
import SchemaView from '@/components/schema-view';

export default function SqlJsPage() {
  const [db, setDb] = useState<Database | null>(null);
  const [sql, setSql] = useState<initSqlJs.SqlJsStatic | null>(null);
  const [error, setError] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [execResults, setExecResults] = useState<QueryExecResult[] | null>(
    null
  );

  const dispatch = useAppDispatch();
  const tables = useAppSelector((state) => state.tables.tables);
  const dispatchSetTables = (tables: Table[]) => dispatch(setTables(tables));
  useEffect(() => {
    initSqlJs({
      // Fetch sql.js wasm file from CDN
      // This way, we don't need to deal with webpack
      locateFile: (file) => `https://sql.js.org/dist/${file}`,
    })
      .then((SQL) => {
        setSql(SQL);
        console.log('in setDB');
        setDb(new SQL.Database());
      })
      .catch((err) => {
        console.log('in catch statement');
        console.log(err);
        setError(String(err));
      });
  }, []);

  const exec = (query: string, db: Database) => {
    try {
      const results = db.exec(query);
      setExecResults(results);
      setError('');
    } catch (err) {
      setExecResults(null);
      setError(String(err));
    }
  };

  /**
   * Renders a single value of the array returned by db.exec(...) as a table
   */

  return (
    <div className={styles.container}>
      {db ? (
        <>
          <div className={styles.top}>
            <div className={styles.editor}>
              <h1>Next.js with SQL.js example</h1>
              <FileInput
                handleFile={(file: File) => {
                  if (!sql) {
                    return;
                  }
                  const fileReader = new FileReader();
                  fileReader.onload = () => {
                    if (
                      typeof fileReader.result !== 'string' &&
                      fileReader.result !== null
                    ) {
                      const typedArray = new Uint8Array(fileReader.result);
                      const db = new sql.Database(typedArray);
                      setDb(db);
                      getTablesMetaData(db, dispatchSetTables);
                    }
                  };
                  fileReader.readAsArrayBuffer(file);
                }}
              />
              <QueryForm
                query={query}
                setQuery={setQuery}
                exec={(query) => exec(query, db)}
              />
            </div>
            <SchemaView />
          </div>
          <Results error={error} results={execResults} />
        </>
      ) : (
        <pre>Loading...</pre>
      )}
    </div>
  );
}

function getTablesMetaData(
  db: Database,
  dispatchSetTables: (tables: Table[]) => {
    payload: Table[];
    type: 'tables/setTables';
  }
) {
  const tablesResponse = db.exec('PRAGMA table_list');
  if (tablesResponse[0].values) {
    const tableNames = tablesResponse[0].values.map((value) =>
      String(value[1])
    );
    const followUpQuery: string = tableNames.reduce((prev, curr) => {
      return prev + `PRAGMA table_info(${curr});`;
    }, '');
    const tableInfoResponse = db.exec(followUpQuery);
    const tables: Table[] = tableInfoResponse.map((tableInfo, index) => {
      const table: Table = {
        name: tableNames[index],
        fields: tableInfo.values.map((fieldInfo) => ({
          name: String(fieldInfo[1]),
          type: String(fieldInfo[2]),
        })),
      };
      return table;
    });
    dispatchSetTables(tables);
  }
}
