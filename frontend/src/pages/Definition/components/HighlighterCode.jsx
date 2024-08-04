import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { fallbackEndOfLines } from '@/utilities'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json'
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql'

export function HighlighterCode({ errorObject, definitionCode }) {
  SyntaxHighlighter.registerLanguage('sql', sql)
  SyntaxHighlighter.registerLanguage('json', json)
  // const tabSizeWidth = 8

  return (
    <SyntaxHighlighter
      language={errorObject ? 'json' : 'sql'}
      style={dracula}
      useInlineStyles={true} // usar por defecto los styles de react-syntax-highlighter
      showLineNumbers={true}
      customStyle={{
        padding: '1rem',
        background: '#1d1f25',
        border: 'none',
      }} // <pre> tag stlyes, acepta solo estilos
      codeTagProps={{ className: 'text-xs' }} // <code> tag props
    >
      {errorObject === null && definitionCode === null
        ? fallbackEndOfLines({ n: 20 })
        : errorObject || definitionCode}
    </SyntaxHighlighter>
  )
}
