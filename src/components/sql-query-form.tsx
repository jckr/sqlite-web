import styles from '@/styles/Editor.module.css';

import { format } from 'sql-formatter';
import hljs from 'highlight.js/lib/core';
import { withFiraCode } from '@/utils/fonts';
import sql from 'highlight.js/lib/languages/sql';
import { useEffect, useRef } from 'react';
hljs.registerLanguage('sql', sql);

type QueryFormProps = {
  exec: (query: string) => void;
  query: string;
  setQuery: (query: string) => void;
};


export default function QueryForm({ exec, query, setQuery }: QueryFormProps) {
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const formatButtonRef = useRef<HTMLButtonElement>(null);
  const executeButtonRef = useRef<HTMLButtonElement>(null);
  
  const isMacOS = navigator?.platform.toUpperCase().indexOf('MAC') >= 0 || false;
  const modifierKey = isMacOS ? 'metaKey' : 'ctrlKey';
  const modiferSymbol = isMacOS ? '⌘' : 'Ctrl';
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.key === 'c' &&
        event[modifierKey] &&
        event.shiftKey &&
        clearButtonRef.current
      ) {
        event.preventDefault();
        clearButtonRef.current.click();
      } else if (
        event.key === 'f' &&
        event[modifierKey] &&
        event.shiftKey &&
        formatButtonRef.current
      ) {
        event.preventDefault();
        formatButtonRef.current.click();
      } else if (
        event.key === 'Enter' &&
        event[modifierKey] &&
        event.shiftKey &&
        executeButtonRef.current
      ) {
        event.preventDefault();
        executeButtonRef.current.click();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    hljs.highlightAll();
  }, [query]);

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
        <button type='reset' ref={clearButtonRef} onClick={(e) => setQuery('')}>
          <span>Clear</span>
          <span>{`${modiferSymbol}-⇧-c`}</span>
        </button>
        <button
          ref={formatButtonRef}
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
          <span>Format query</span>
          <span>{`${modiferSymbol}-⇧-f`}</span>
        </button>
        <button
          type='submit'
          ref={executeButtonRef}
          onClick={(e) => exec(query)}
        >
          <span>Execute query</span>
          <span>{`${modiferSymbol}-⇧-Enter`}</span>
        </button>
      </div>
    </div>
  );
}
