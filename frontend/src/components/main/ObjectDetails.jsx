// deprecated
export function ObjectDetails({ object }) {
  const info = [
    {
      id: 1,
      title: 'schema:',
      value: object.schemaName ?? '',
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
    <div className="flex flex-col gap-2">
      <h3 className="text-primary/90 text-base font-semibold dark:font-medium">Metadata</h3>
      <ul className="flex flex-col flex-wrap gap-2 sm:flex-row">
        {info.map((item) => (
          <li
            key={item.id}
            className="shadow-custom-card bg-card flex max-w-64 items-center justify-between gap-6 rounded-sm px-2.5 py-1.5"
          >
            <div className="flex items-baseline gap-2">
              <h6 className="dark:text-muted text-secondary text-xs font-semibold">{item.title}</h6>
              <p className="text-primary/90 text-xs font-semibold">
                <span>{item.value} </span>
                {item.has_tag && <span className="text-xs text-amber-500">{item.tag}</span>}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
