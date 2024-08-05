import { Article as ArticleIcon } from '@/icons/article'
import { BreadcrumCard } from './BreadcrumCard'
import { useObjectStore } from '@/stores/object.store'

export function InfoCards() {
  const object = useObjectStore((state) => state.object)

  const info = [
    {
      id: 1,
      title: 'Tipo',
      value: object.typeDesc ?? 'No disponible',
      has_tag: true,
      tag: object.type ?? 'No disponible',
      icon: <ArticleIcon width={22} height={22} />,
      className: 'bg-red-400 text-white',
    },
    {
      id: 2,
      title: 'Fecha de creación',
      value: object.createDate ?? 'No disponible',
      icon: <ArticleIcon width={22} height={22} />,
      className: 'bg-red-400 text-white',
    },
    {
      id: 3,
      title: 'Fecha de modificación',
      value: object.modifyDate ?? 'No disponible',
      icon: <ArticleIcon width={22} height={22} />,
      className: 'bg-zinc-400 text-white',
    },
  ]

  return (
    <div className="flex flex-col gap-3">
      {/* Información general del objecto */}
      <BreadcrumCard />

      <ul className="grid grid-cols-[repeat(auto-fit,_minmax(390px,_1fr))] gap-3">
        {info.map((item) => (
          <li
            key={item.id}
            className="bg-ownavbar border-owborder flex items-center justify-between gap-6 rounded-md border px-6 py-4"
          >
            <div className="flex flex-col gap-1">
              <h6 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                {item.title}
              </h6>
              <p className="text-base font-bold text-slate-900 dark:text-white">
                <span>{item.value} </span>
                {item.has_tag && (
                  <span className="text-base text-amber-500">({item.tag})</span>
                )}
              </p>
            </div>
            <i
              className={`grid place-content-center rounded-md p-2 ${item.className}`}
            >
              {item.icon}
            </i>
          </li>
        ))}
      </ul>
    </div>
  )
}
