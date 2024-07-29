import './custom-highlight.css'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql'

export function DefinitionObject({ object, updateNameObject }) {
  SyntaxHighlighter.registerLanguage('sql', sql)
  const tabSizeWidth = 8

  const info = [
    {
      title: 'Tipo',
      value: object.typeDesc,
      has_tag: true,
      tag: object.type,
    },
    {
      title: 'Fecha de creación',
      value: object.createDate,
    },
    {
      title: 'Fecha de modificación',
      value: object.modifyDate,
    },
  ]
  return (
    <section className="flex flex-col gap-6">
      <div>
        <ul className="grid grid-cols-[repeat(auto-fill,_minmax(310px,_1fr))] gap-3">
          {info.map((item, index) => (
            <li
              key={item.title}
              className="flex flex-col gap-0.5 rounded-md bg-white px-6 py-3 shadow-[0_20px_27px_0_rgba(0,0,0,.05)] dark:bg-[#2e303c]"
            >
              <h6 className="text-sm font-semibold text-slate-500 dark:text-slate-500">
                {item.title}
              </h6>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                <span>{item.value} </span>
                {item.has_tag && (
                  <span className="text-base text-emerald-500">
                    ({item.tag})
                  </span>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Código */}
      <div className="mb-10 overflow-hidden rounded-md shadow">
        <SyntaxHighlighter
          language="sql"
          style={dracula}
          useInlineStyles={true} // usar por defecto los styles de react-syntax-highlighter
          showLineNumbers={true}
          customStyle={{ padding: '1rem' }} // <pre> tag stlyes, acepta solo estilos
          codeTagProps={{
            className: 'text-xs',
            style: { tabSize: tabSizeWidth },
          }} // <code> tag props
        >
          {object.codeString}
        </SyntaxHighlighter>
      </div>
    </section>
  )
}
