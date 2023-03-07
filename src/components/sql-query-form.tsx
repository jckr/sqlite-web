import styles from '@/styles/Editor.module.css';

import { format } from 'sql-formatter';
import hljs from 'highlight.js/lib/core';
import { withFiraCode } from '@/utils/fonts';
import sql from 'highlight.js/lib/languages/sql';
import { useEffect } from 'react';
hljs.registerLanguage('sql', sql);

type QueryFormProps = {
  exec: (query: string) => void;
  query: string;
  setQuery: (query: string) => void;
};

export default function QueryForm({ exec, query, setQuery }: QueryFormProps) {
  useEffect(() => {
    hljs.highlightAll();
  });
  return (
    <div className={styles['editor']}>
      <div className={withFiraCode(styles.codeBox)}>
        <pre>
          <code className='language-sql'>{query}</code>
        </pre>
        <textarea
        className={styles['input']}
          id='query-box'
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder='Enter some SQL. No inspiration ? Try "select sqlite_version()"'
        />
      </div>
      <div className={styles['button-row']}>
        <button
          onClick={(e) => {
            setQuery(
              format(query, {
                language: 'sql',
                keywordCase: 'upper',
              })
            );
            e.preventDefault();
          }}
        >
          Format query
        </button>
        <button type='submit' onClick={(e) => exec(query)}>Execute query</button>
      </div>
    </div>
  );
}
