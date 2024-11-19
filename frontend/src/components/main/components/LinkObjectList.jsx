import { SquareArrowOutUpRight } from 'lucide-react'

export function LinkObjectList({ objectList, updateObject, fetchObjectAction }) {
  const handleLinkObject = async (e) => {
    e.preventDefault()
    const myobject = {
      id: e.currentTarget.dataset.id,
      schema: e.currentTarget.dataset.schema,
      name: e.currentTarget.dataset.name,
    }
    // solicita la definición del objeto
    updateObject({ object: myobject })
    fetchObjectAction()
  }
  return (
    <div className="bg-baselayer flex w-fit flex-col gap-2">
      <h6 className="flex items-baseline gap-2 text-sm text-white">
        <span>Se encontraron {objectList.length} coincidencias del objeto</span>
        <span className="pt-2 text-zinc-400">Selecciona uno de ellos</span>
      </h6>
      <ul className="flex flex-col gap-1">
        {objectList.map((obj) => (
          <li key={obj.id}>
            <button
              className="group flex items-center gap-2 rounded-md border border-zinc-700/50 px-2 py-2 text-sm"
              onClick={handleLinkObject}
              data-id={obj.id}
              data-schema={obj.schema}
              data-name={obj.name}
            >
              <div className="flex items-center gap-0.5 text-sm">
                <span className="text-amber-400 group-hover:underline">{obj.schema}</span>
                <span className="font-bold text-white">.</span>
                <span className="text-rose-500 group-hover:underline">{obj.name}</span>
              </div>
              <i className="grid place-items-center text-white transition-transform duration-200 group-hover:-translate-y-0.5">
                <SquareArrowOutUpRight size={16} />
              </i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
