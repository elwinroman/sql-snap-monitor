import { useObjectStore } from '@/stores/object.store'
import { ExternalLink as ExternalLinkIcon } from '@/icons/external-link'

export function LinkObjects({ listObjects }) {
  const setObject = useObjectStore((state) => state.setObject)
  const fetchDefinition = useObjectStore((state) => state.fetchDefinition)

  const handleLinkObject = async (e) => {
    e.preventDefault()
    const myobject = {
      id: e.currentTarget.dataset.id,
      schema: e.currentTarget.dataset.schema,
      name: e.currentTarget.dataset.name,
      type: e.currentTarget.dataset.type,
      typeDesc: e.currentTarget.dataset.typeDesc,
      createDate: e.currentTarget.dataset.createDate,
      modifyDate: e.currentTarget.dataset.modifyDate,
    }
    // solicita la definición del objeto
    setObject({ object: myobject })
    fetchDefinition()
  }
  return (
    <div className="flex flex-col gap-4 p-6">
      <h6 className="flex flex-col font-semibold text-white">
        <span>Se encontraron 2 o más coincidencias del objeto</span>
        <span className="font-normal text-zinc-400">
          Selecciona uno de ellos
        </span>
      </h6>
      <ul className="flex flex-col gap-2">
        {listObjects.map((obj) => (
          <li key={obj.id}>
            <button
              className="group flex items-center gap-2 rounded-md border border-zinc-700/50 bg-slate-900 px-2 py-2 text-sm"
              onClick={handleLinkObject}
              data-id={obj.id}
              data-schema={obj.schema}
              data-name={obj.name}
              data-type={obj.type}
              data-type-desc={obj.typeDesc}
              data-create-date={obj.createDate}
              data-modify-date={obj.modifyDate}
            >
              <div className="flex items-center gap-0.5">
                <span className="font-semibold text-amber-400 group-hover:underline">
                  {obj.schema}
                </span>
                <span className="font-bold text-white">.</span>
                <span className="font-semibold text-rose-500 group-hover:underline">
                  {obj.name}
                </span>
              </div>
              <i className="grid place-items-center text-white transition-transform duration-200 group-hover:-translate-y-0.5">
                <ExternalLinkIcon width={16} height={16} />
              </i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
