import styles from "@/styles/Title.module.css";
import FileInput from './file-input';
import ExportDB from './export-db';

export type TitleBarProps = {
  loadFile: (file: File) => void;
  saveFile: () => void;
}

export default function TitleBar({loadFile, saveFile}: TitleBarProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>SQLite Viewer</h1>
      <section className={styles.section}>
      <FileInput loadFile={loadFile} />
      <ExportDB saveFile={saveFile} />
      </section>
    </header>
  );
}