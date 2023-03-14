import styles from '@/styles/Results.module.css';
import { SqlValue } from 'sql.js';

type ExecResult = {
  columns: string[];
  values: SqlValue[][];
};

type ResultTableProps = {
  results: Array<ExecResult>;
};

export default function ResultsTable({ results }: ResultTableProps) {
  return (
    <div className={styles.tables}>
      {results.map(({ columns, values }, rIndex) => (
        <table className={styles.table} key={rIndex}>
          <thead>
            <tr>
              {columns.map((columnName) => (
                <th key={columnName}>{columnName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {values.map(
              (
                row, // values is an array of arrays representing the results of the query
                rowIndex
              ) => (
                <tr key={rowIndex}>
                  {row.map((value, cellIndex) => (
                    <td key={cellIndex}>{value}</td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      ))}
    </div>
  );
}
