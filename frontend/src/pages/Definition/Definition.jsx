import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql'
import { useObjectStore } from '@/stores/object.store'

export function Definition() {
  const object = useObjectStore((state) => state.object)
  const errorObject = useObjectStore((state) => state.errorObject)
  const definitionCode = useObjectStore((state) => state.definitionCode)
  const listObjects = useObjectStore((state) => state.listObjects)

  SyntaxHighlighter.registerLanguage('sql', sql)
  const tabSizeWidth = 8

  const info = [
    {
      title: 'Tipo',
      value: object.typeDesc ?? 'No disponible',
      has_tag: true,
      tag: object.type ?? 'No disponible',
    },
    {
      title: 'Fecha de creación',
      value: object.createDate ?? 'No disponible',
    },
    {
      title: 'Fecha de modificación',
      value: object.modifyDate ?? 'No disponible',
    },
  ]
  return (
    <section className="flex flex-col gap-6">
      <div>
        <ul className="grid grid-cols-[repeat(auto-fill,_minmax(310px,_1fr))] gap-3">
          {info.map((item, index) => (
            <li
              key={index}
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
        {listObjects.length === 0 && (
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
            {errorObject || definitionCode}
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
