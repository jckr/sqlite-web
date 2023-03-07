import styles from '@/styles/Title.module.css';
import { TitleBarProps } from './title-bar';

export default function FileInput({ handleFile }: TitleBarProps) {
  return (
    <section className={styles.section}>
      <label htmlFor='file-input'>Open</label>
      <input
        className={styles['hidden-input']}
        type='file'
        id='file-input'
        onChange={(e) => {
          if (e.target.files?.length) {
            handleFile(e.target.files[0]);
          }
        }}
      />
    </section>
  );
}
