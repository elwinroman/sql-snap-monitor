import { useObjectStore } from '@/stores/object.store'
import { BreadcrumCard } from './BreadcrumCard'

export function InfoCards() {
  const object = useObjectStore((state) => state.object)

  const info = [
    {
      id: 1,
      title: 'Tipo',
      value: object.typeDesc ?? 'No disponible',
      has_tag: true,
      tag: object.type ?? 'No disponible',
    },
    {
      id: 2,
      title: 'Fecha de creación',
      value: object.createDate ?? 'No disponible',
    },
    {
      id: 3,
      title: 'Fecha de modificación',
      value: object.modifyDate ?? 'No disponible',
    },
  ]

  return (
    <div>
      <ul className="grid grid-cols-[repeat(auto-fit,_minmax(390px,_1fr))] gap-3">
        {/* Información general del objecto */}
        <BreadcrumCard className="rounded-md bg-gradient-to-r from-slate-950 to-slate-900 px-6 py-3 shadow-[0_20px_27px_0_rgba(0,0,0,.05)]" />

        {info.map((item) => (
          <li
            key={item.id}
            className="dark:bg-ownavbar border-owborder flex flex-col gap-0.5 rounded-md border bg-white px-6 py-3"
          >
            <h6 className="text-sm font-semibold text-slate-500 dark:text-slate-500">
              {item.title}
            </h6>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              <span>{item.value} </span>
              {item.has_tag && (
                <span className="text-base text-emerald-500">({item.tag})</span>
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
