export function LinkObjects({ listObjects }) {
  return (
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
  )
}
