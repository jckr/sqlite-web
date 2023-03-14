import styles from "@/styles/Results.module.css";

export default function SQLError({ error }: {error: string}) {
  return (
    <div className={styles.error}>
      <pre>{error}</pre>
    </div>
  );
}