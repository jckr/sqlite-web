
export default function ExportDB({ saveFile }: { saveFile: () => void }) {
  return (
    <>
      <label htmlFor='export-db' onClick={() => saveFile()}>Export</label>
    </>
  );
}


