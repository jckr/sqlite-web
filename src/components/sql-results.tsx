import { SqlValue } from "sql.js";
import styles from "@/styles/Results.module.css";
import SQLError  from "@/components/sql-error";
import ResultsTable from './results-table';

type ExecResult = {
  columns: string[];
  values: SqlValue[][];
};

type ResultTableProps = {
  results: Array<ExecResult> | null;
  error: string | null;
};

export default function Results({ error, results }: ResultTableProps) {
  if (error) {
    return (<div className={styles.results}>
      <SQLError error={error} />
      </div>);
  }
  return (<div className={styles.results}>
    <ResultsTable results={results || []} />
  </div>);

}
