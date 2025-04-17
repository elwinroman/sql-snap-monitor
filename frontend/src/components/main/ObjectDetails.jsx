export function ObjectDetails({ object }) {
  const info = [
    {
      id: 1,
      title: 'schema:',
      value: object.schema ?? '',
    },
    {
      id: 2,
      title: 'tipo:',
      value: object.typeDesc ?? '',
      has_tag: true,
      tag: object.type ? `(${object.type})` : '',
    },
    {
      id: 3,
      title: 'fecha de creación:',
      value: object.createDate ?? '',
    },
    {
      id: 4,
      title: 'fecha de modificación:',
      value: object.modifyDate ?? '',
    },
  ]

  return (
    <ul className="flex flex-col flex-wrap gap-2 sm:flex-row">
      {info.map((item) => (
        <li key={item.id} className="shadow-custom-card flex max-w-64 items-center justify-between gap-6 rounded-sm bg-card px-2.5 py-1.5">
          <div className="flex items-baseline gap-2">
            <h6 className="text-xs font-semibold dark:text-muted text-secondary">{item.title}</h6>
            <p className="text-xs font-semibold text-primary">
              <span>{item.value} </span>
              {item.has_tag && <span className="text-xs text-amber-500">{item.tag}</span>}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
