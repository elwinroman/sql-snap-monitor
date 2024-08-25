import { Article as ArticleIcon } from '@/icons/article'
import { BreadcrumCard } from './BreadcrumCard'

export function InfoCards({ object }) {
  const info = [
    {
      id: 1,
      title: 'Tipo',
      value: object.typeDesc ?? '-',
      has_tag: true,
      tag: object.type ? `(${object.type})` : '',
      icon: <ArticleIcon width={22} height={22} />,
      className: 'bg-emerald-500/20 text-emerald-500',
    },
    {
      id: 2,
      title: 'Fecha de creación',
      value: object.createDate ?? '-',
      icon: <ArticleIcon width={22} height={22} />,
      className: 'bg-indigo-400/20 text-indigo-400',
    },
    {
      id: 3,
      title: 'Fecha de modificación',
      value: object.modifyDate ?? '-',
      icon: <ArticleIcon width={22} height={22} />,
      className: 'bg-rose-500/20 text-rose-500',
    },
  ]

  return (
    <div className="flex flex-col gap-5">
      {/* Información general del objecto */}
      <BreadcrumCard object={object} />

      <ul className="grid auto-rows-fr grid-cols-[repeat(auto-fill,_minmax(310px,_1fr))] gap-5">
        {info.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-6 rounded-md border border-owborder bg-owcard px-6 py-2"
          >
            <div className="flex flex-col gap-1">
              <h6 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                {item.title}
              </h6>
              <p className="dark:text-zinc-40000 text-base font-bold text-slate-300">
                <span>{item.value} </span>
                {item.has_tag && (
                  <span className="text-base text-amber-500">{item.tag}</span>
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
