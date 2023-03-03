import styles from "@/styles/Title.module.css";
import FileInput from './file-input';

export type TitleBarProps = {
  handleFile: (file: File) => void;
}

export default function TitleBar({handleFile}: TitleBarProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>SQLite Viewer</h1>
      <FileInput handleFile={handleFile} />
    </header>
  );
}