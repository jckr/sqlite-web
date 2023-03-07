import { SqlValue } from "sql.js";
import styles from "@/styles/Home.module.css";

type ExecResult = {
  columns: string[];
  values: SqlValue[][];
};

type ResultTableProps = {
  results: Array<ExecResult> | null;
  error: string | null;
};

export default function Results({ error, results }: ResultTableProps) {
  return (
    <div className={styles.results}>
      <label>Results: </label>
      <pre className={styles.error}>{(error || "").toString()}</pre>
      <pre>
        {results && results.map(({ columns, values }, rIndex) => (
          <table key={rIndex}>
            <thead>
              <tr>
                {columns.map((columnName) => (
                  <td key={columnName}>{columnName}</td>
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
      </pre>
    </div>
  );
}
