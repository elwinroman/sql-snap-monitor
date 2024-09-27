import { useSQLDefinitionStore } from '@/stores'

export function ObjectInfoCard({ object }) {
  const onDiffEditor = useSQLDefinitionStore((state) => state.onDiffEditor)
  if (onDiffEditor) return null

  const info = [
    {
      id: 1,
      title: 'schema:',
      value: object.schema ?? '',
      className: 'bg-rose-400/20 text-rose-400',
    },
    {
      id: 2,
      title: 'tipo:',
      value: object.typeDesc ?? '',
      has_tag: true,
      tag: object.type ? `(${object.type})` : '',
      className: 'bg-cyan-400/20 text-cyan-400',
    },
    {
      id: 3,
      title: 'fecha de creación:',
      value: object.createDate ?? '',
      className: 'bg-emerald-500/20 text-emerald-500',
    },
    {
      id: 4,
      title: 'fecha de modificación:',
      value: object.modifyDate ?? '',
      className: 'bg-indigo-400/20 text-indigo-400',
    },
  ]

  return (
    <ul className="flex flex-col flex-wrap gap-2 sm:flex-row">
      {info.map((item) => (
        <li
          key={item.id}
          className="flex max-w-64 items-center justify-between gap-6 rounded-md border border-owborder bg-owcard px-3 py-2"
        >
          <div className="flex items-baseline gap-2">
            <h6 className="text-xs font-normal text-zinc-600 dark:text-zinc-400">{item.title}</h6>
            <p className="text-xs font-medium text-slate-300 dark:text-zinc-100">
              <span>{item.value} </span>
              {item.has_tag && <span className="text-xs text-amber-400">{item.tag}</span>}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
