import styles from '@/styles/Title.module.css';

export default function FileInput({ loadFile }: { loadFile: (file: File) => void }) {
  return (
    <>
      <label htmlFor='file-input'>Open</label>
      <input
        className={styles['hidden-input']}
        type='file'
        id='file-input'
        onChange={(e) => {
          if (e.target.files?.length) {
            loadFile(e.target.files[0]);
          }
        }}
      />
    </>
  );
}
