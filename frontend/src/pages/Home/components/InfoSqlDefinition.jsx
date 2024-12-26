import { SYS_OBJECT_TYPES } from '@/constants'
import { CloudCodeIcon, CloudIdsIcon, DatabaseMigrationIcon, DataLossIcon } from '@/icons'

export function InfoSqlDefinition({ className }) {
  return (
    <section>
      <div className={`${className} grid grid-cols-12 grid-rows-2 gap-4`}>
        <Card className="col-span-12 row-span-1 sm:col-span-6 md:col-span-4 lg:col-span-3">
          <CardTitle>Definiciones SQL</CardTitle>
          <CardDescription>
            Consulta las estructuras de código que definen objetos de base de datos y que se almacenan como metadatos
          </CardDescription>
          <i className="self-center text-amber-300">
            <CloudCodeIcon size={90} />
          </i>
        </Card>

        <Card className="col-span-12 row-span-1 sm:col-span-6 md:col-span-4 lg:col-span-3">
          <CardTitle>Compara</CardTitle>
          <CardDescription>
            Compara y alinea los objetos SQL en tus bases de datos de prueba y pre-producción, identificando cualquier diferencia
          </CardDescription>
          <i className="self-center text-rose-400">
            <DatabaseMigrationIcon size={90} />
          </i>
        </Card>

        <Card className="col-span-12 sm:col-span-12 md:col-span-4 md:row-span-2 lg:col-span-6 lg:row-span-1">
          <CardTitle>Tipos de objetos soportados</CardTitle>
          <CardDescription>Las definiciones SQL admiten una variedad de objetos</CardDescription>
          <div className="grid w-full grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-x-4 gap-y-2">
            {SYS_OBJECT_TYPES.map((type) => (
              <div key={type.type} className="flex items-center gap-2">
                <span className="grid min-h-7 min-w-7 place-content-center rounded-sm bg-slate-300 text-sm font-semibold dark:bg-zinc-950">
                  {type.type}
                </span>
                <span className="text-[0.84rem] text-secondary">{type.description}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-12 row-span-1 sm:col-span-6 md:col-span-4 lg:col-span-3">
          <CardTitle>Busca tu objeto</CardTitle>
          <CardDescription>
            Si necesitas más detalles, solo usa <strong> el buscador de arriba</strong>. ¡Te ayudará a encontrar lo que buscas en segundos!
          </CardDescription>
          <i className="self-center text-rose-400">
            <DataLossIcon size={90} />
          </i>
        </Card>

        <Card className="col-span-12 row-start-6 sm:col-span-12 sm:row-start-4 md:col-span-12 md:row-span-1 md:row-start-3 lg:col-span-6 lg:row-span-1">
          <CardTitle>Visualiza y personaliza</CardTitle>
          <div className="grid grid-cols-2">
            <CardDescription className="text-balance">
              Explora y personaliza el editor de código para adaptarlo a tu flujo de trabajo.
            </CardDescription>
            <div>
              <img src="programming-code-editor-illustration-1024x819.png" alt="" className="h-44 bg-cover" />
            </div>
          </div>
        </Card>

        <Card className="col-span-12 row-span-1 sm:col-span-6 md:col-span-4 lg:col-span-3">
          <CardTitle>Gestor de roles</CardTitle>
          <CardDescription>
            Recupera y gestiona los roles asociados a tu objeto. Muestra o oculta los roles disponibles, o si no hay roles asignados
          </CardDescription>
          <i className="self-center text-purple-300">
            <CloudIdsIcon size={90} />
          </i>
        </Card>
      </div>
    </section>
  )
}

function Card({ children, className }) {
  return (
    <div className={`shadow-custom-card bg-background-paperChanel flex flex-col gap-4 rounded-sm px-6 py-6 ${className}`}>{children}</div>
  )
}

function CardTitle({ children }) {
  return <span className="text-lg font-semibold text-primary">{children}</span>
}

function CardDescription({ children, className }) {
  return <p className={`text-sm text-secondary ${className}`}>{children}</p>
}
