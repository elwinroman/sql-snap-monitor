import { APP_NAME } from '@/constants'

import { InfoSqlDefinition } from './components/InfoSqlDefinition'

export function HomePage() {
  return (
    <>
      <section className="my-auto grid h-[88vh] w-full place-content-center gap-10 py-10">
        {/* Hero section */}
        <div className="container w-full max-w-(--breakpoint-xl) px-4 md:px-6">
          <div className="flex flex-col items-center gap-10 text-center">
            <div className="flex flex-col gap-6">
              <h1 className="max-w-3xl font-['Barlow'] text-2xl font-bold tracking-normal sm:text-4xl md:text-5xl lg:text-6xl/none">
                Optimiza tu gestión con <span className="gradient-text">{APP_NAME}</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-[20px] text-balance">
                Herramienta de gestión de metadatos SQL, definiciones SQL, información de tablas de usuario, y más.
              </p>
            </div>

            <div></div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <h3 className="text-muted text-sm font-bold">SOPORTE PARA</h3>
              </div>
              <div className="border-border text-primary flex flex-col items-center justify-center gap-2 rounded border px-4 py-4 dark:border-transparent">
                <img src="microsoft-sql-server-logo.svg" width={70} height={70} alt="logo de microsoft sql server" className="max-w-none" />
                <span className="text-secondary text-sm">MSSQL Server</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background w-full py-32">
        <div className="mx-auto flex max-w-(--breakpoint-xl) flex-col gap-6">
          <h3 className="text-muted text-sm font-bold">HERRAMIENTAS</h3>
          <h2 className="font-['Barlow'] text-4xl font-bold tracking-normal">
            Definiciones <span>SQL</span>
          </h2>
          <InfoSqlDefinition className="mx-auto max-w-(--breakpoint-xl)" />
        </div>
      </section>

      <div className="main-background"></div>
    </>
  )
}
