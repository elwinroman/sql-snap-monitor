import { InfoSqlDefinition } from './components/InfoSqlDefinition'

export function HomePage() {
  return (
    <section className="mx-auto flex h-full w-full max-w-screen-xl flex-col gap-10 py-10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-10 text-center">
          <div className="flex flex-col gap-6">
            <h1 className="max-w-4xl text-2xl font-bold tracking-normal sm:text-4xl md:text-5xl lg:text-6xl/none">
              Optimiza tu gestión con SQL Snap Monitor
            </h1>
            <p className="mx-auto max-w-[700px] text-sm text-secondary md:text-base">
              Herramienta de gestión de metadatos SQL, recupera definiciones SQL, información de tablas de usuario, compara procedimientos
              almacenados, rastreo de claves foraneas y más.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-semibold text-primary">Soporte DBs</h2>
              <p className="text-secondary">Actualmente se da soporte a</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 rounded border border-border bg-slate-700 px-4 py-4 text-primary dark:border-transparent">
              <img src="microsoft-sql-server-logo.svg" width={80} height={80} alt="logo de microsoft sql server" className="max-w-none" />
              <span className="text-sm">MSSQL Server</span>
            </div>
          </div>
        </div>
      </div>

      <InfoSqlDefinition />
    </section>
  )
}
