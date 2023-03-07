import styles from '@/styles/SchemaView.module.css';
import { useAppSelector } from '@/slices/hook';
import { useState } from 'react';
import { withFiraCode } from '@/utils/fonts';

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
    <>
      <header className={styles.header}>
        <div className={styles.back} onClick={() => selectTable('')}>
          Back to table list
        </div>
        <h2 className={withFiraCode(styles['table-name'])}>{table}</h2>
        <label>Fields:</label>
      </header>
      <div className={styles.content}>
        <div className={styles['fields-list']}>
          {selectedTable.fields?.map((field) => (
            <div key={field.name} className={styles.row}>
              <div className={withFiraCode(styles.name)}>{field.name}</div>
              {field.type && (
                <div className={withFiraCode(styles.type)} data-type={getTypeForDataAttribute(field.type)}>
                  {field.type}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function TableList({ selectTable }: { selectTable: (table: string) => void }) {
  const tables = useAppSelector((state) => state.tables.tables);
  return (
    <>
      <header className={styles.header}>
        <label>List of tables</label>
      </header>
      <div className={styles.content}>
        {tables.length === 0 && <EmptyTableList />}
        <div className={styles['tables-list']}>
          {tables.map((table) => (
            <div key={table.name} className={styles.row}>
              <div
                className={withFiraCode(styles['table-link'])}
                onClick={() => selectTable(table.name)}
              >
                {table.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>Click on a table for a list of fields</div>
    </>
  );
}

function EmptyTableList() {
  return <div>No tables found</div>;
}

function getTypeForDataAttribute(type: string) {
  if (type.length === 0) return null;
  const allCapsType = type.toUpperCase();
  if (allCapsType === 'INTEGER' || allCapsType === 'REAL' || allCapsType === 'TEXT' || allCapsType === 'BLOB' || allCapsType === 'NULL') return type;
  if (allCapsType.includes('CHAR')) return 'TEXT';
  if (allCapsType === 'CLOB') return 'TEXT';
  if (allCapsType.includes('INT')) return 'INTEGER';
  if (allCapsType.includes('DOUBLE')) return 'REAL';
  if (allCapsType === 'FLOAT') return 'REAL';
  // todo - create a new set of styles for these
  if (allCapsType === 'NUMERIC') return 'REAL';
  if (allCapsType.startsWith('DECIMAL')) return 'REAL';
  if (allCapsType === 'BOOLEAN') return 'REAL';
  if (allCapsType.includes('DATE')) return 'TEXT';
  return 'UNKNOWN';
}
