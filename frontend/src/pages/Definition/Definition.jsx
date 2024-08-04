import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { fallbackEndOfLines } from '@/utilities'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { useObjectStore } from '@/stores/object.store'
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json'
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql'
import { InfoCards } from './components/InfoCards'

export function Definition() {
  const errorObject = useObjectStore((state) => state.errorObject)
  const definitionCode = useObjectStore((state) => state.definitionCode)
  const listObjects = useObjectStore((state) => state.listObjects)

  SyntaxHighlighter.registerLanguage('sql', sql)
  SyntaxHighlighter.registerLanguage('json', json)
  // const tabSizeWidth = 8

  return (
    <section className="flex flex-col gap-6">
      {/* Información del objecto */}
      <InfoCards />

      {/* Código */}
      <div className="mb-10 overflow-hidden rounded-md shadow">
        {listObjects.length === 0 && (
          <SyntaxHighlighter
            language={errorObject ? 'json' : 'sql'}
            style={dracula}
            useInlineStyles={true} // usar por defecto los styles de react-syntax-highlighter
            showLineNumbers={true}
            customStyle={{ padding: '1rem' }} // <pre> tag stlyes, acepta solo estilos
            codeTagProps={{ className: 'text-xs' }} // <code> tag props
          >
            {errorObject === null && definitionCode === null
              ? fallbackEndOfLines({ n: 20 })
              : errorObject || definitionCode}
          </SyntaxHighlighter>
        )}
        {listObjects.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Se encontraron múltiples objetos con el mismo nombre
            </h2>
            <ul>
              {listObjects.map((obj) => (
                <li key={obj.id}>
                  <p>{obj.name}</p>
                  <button>Ver definición</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
