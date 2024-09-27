import { Sparkles as SparklesIcon } from '@/icons/sparkles'

export function Info() {
  const tipos = [
    {
      id: 1,
      codigo: 'P',
      description: 'Procedimiento almacenado (Stored Procedure)',
    },
    {
      id: 2,
      codigo: 'V',
      description: 'Vista (View)',
    },
    {
      id: 3,
      codigo: 'FN',
      description: 'Función escalar (Scalar Function)',
    },
    {
      id: 4,
      codigo: 'TR',
      description: 'Trigger (Disparador)',
    },
    {
      id: 5,
      codigo: 'R',
      description: 'Regla (Rule) - Es un tipo de objeto que ya no se recomienda usar (obsoleto)',
    },
    {
      id: 6,
      codigo: 'IF',
      description: 'Función con valor de tabla en línea (Inline Table-Valued Function)',
    },
    {
      id: 7,
      codigo: 'TF',
      description: 'Función con valor de tabla (Table-Valued Function)',
    },
  ]

  return (
    <div className="flex flex-col justify-items-start gap-6 sm:gap-8 md:gap-10 lg:flex-row">
      <div className="flex flex-col gap-6">
        <p className="text-prety text-sm dark:text-gray-300">
          Las definiciones de objetos se refieren a las descripciones y el código fuente de los objetos del sistema, como:
        </p>
        <ul className="flex flex-col gap-2 text-sm dark:text-gray-300 lg:gap-3">
          {tipos.map((item) => (
            <li key={item.id} className="flex items-start gap-2">
              <span className="min-w-7 text-balance rounded-sm border border-zinc-700 bg-slate-800 py-0.5 text-center text-xs dark:text-gray-100">
                {item.codigo}
              </span>
              <span>{item.description}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3">
          <div className="flex w-fit flex-row items-center gap-1 rounded-sm border border-white bg-slate-100 px-3 py-1 outline outline-1 outline-gray-200 dark:border-gray-700 dark:bg-transparent dark:outline-none">
            <i className="text-emerald-500">
              <SparklesIcon width={16} height={16} />
            </i>
            <span className="text-sm font-bold text-gray-800 dark:font-semibold dark:text-gray-300">Busca tu objeto</span>
          </div>

          <p className="text-prety text-sm dark:text-gray-300">
            Si necesitas más detalles sobre tus objetos SQL, solo usa
            <strong> el buscador de arriba</strong>. ¡Te ayudará a encontrar lo que buscas en segundos!
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-sm">
        <img
          src="https://img.freepik.com/vector-gratis/mejora-etapa-o-plan-tarifas-alojamiento-web-sala-servidores-pasos-progreso-tecnologia_39422-796.jpg?t=st=1726210397~exp=1726213997~hmac=8a057da9007415e09c1c2c8961951bdfd8eeb0dbce1a775efb8c8625ec55ab33&w=1380"
          alt=""
        />
      </div>
    </div>
  )
}
