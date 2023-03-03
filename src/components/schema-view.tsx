import styles from '@/styles/SchemaView.module.css';
import { useAppSelector } from '@/slices/hook';
import { useState } from 'react';

export default function SchemaView() {
  const tables = useAppSelector((state) => state.tables.tables);
  const [selectedTable, setSelectedTable] = useState<string>('');

  return (
    <div className={styles['schema-view']}>
      {selectedTable ? (
        <TableView table={selectedTable} selectTable={setSelectedTable} />
      ) : (
        <TableList selectTable={setSelectedTable} />
      )}
    </div>
  );
}

function TableView({
  table,
  selectTable,
}: {
  table: string;
  selectTable: (table: string) => void;
}) {
  const tables = useAppSelector((state) => state.tables.tables);
  const selectedTable = tables.find((t) => t.name === table);
  if (!selectedTable) {
    return <div>Table not found</div>;
  }
  return (
    <><header className={styles.header}>
      <div className={styles.back} onClick={() => selectTable('')}>Back to table list</div>
      <h2 className={styles['table-name']}>{table}</h2>
      <label>Fields:</label>
      </header>
      <div className={styles.content}>
      <table className={styles['fields-list']}>
        {selectedTable.fields?.map((field) => (
          <tr key={field.name}>
            <div className={styles.name}>{field.name}</div>
            {field.type && <div className={styles.type} data-type={field.type} >{field.type}</div>}
          </tr>
        ))}
      </table>
      </div>
    </>
  );
}

function TableList({ selectTable }: { selectTable: (table: string) => void }) {
  const tables = useAppSelector((state) => state.tables.tables);
  return (
    <><header className={styles.header}>
      <label>List of tables</label>
      </header>
      <div className={styles.content}>
      {tables.length === 0 && <EmptyTableList />}
      <table className={styles['tables-list']}>
        {tables.map((table) => (
          <tr 
            className={styles['table-link']}
            key={table.name} onClick={() => selectTable(table.name)}>
            
              {table.name}
            
          </tr>
        ))}
      </table>
      </div>
      <div>Click on a table for a list of fields</div>
    </>
  );
}

function EmptyTableList() {
  return <div>No tables found</div>;
}
