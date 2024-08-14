import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { fallbackEndOfLines } from '@/utilities'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json'
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql'
import './highlighter-code.css'

export function HighlighterCode({ definitionError, definitionCode }) {
  SyntaxHighlighter.registerLanguage('sql', sql)
  SyntaxHighlighter.registerLanguage('json', json)
  // const tabSizeWidth = 8

  return (
    <SyntaxHighlighter
      language={definitionError ? 'json' : 'sql'}
      style={dracula}
      useInlineStyles={true} // usar por defecto los styles de react-syntax-highlighter
      showLineNumbers={true}
      customStyle={{
        padding: '3rem 0rem',
        background: 'var(--ow-card)',
        border: 'none',
      }} // <pre> tag stlyes, acepta solo estilos
      codeTagProps={{ className: 'text-xs fix-tab-size' }} // <code> tag props
    >
      {definitionError === null && definitionCode === null
        ? fallbackEndOfLines({ n: 10 })
        : definitionError || definitionCode}
    </SyntaxHighlighter>
  )
}
