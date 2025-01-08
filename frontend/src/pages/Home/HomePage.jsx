import { APP_NAME } from '@/constants'

import { InfoSqlDefinition } from './components/InfoSqlDefinition'

export function HomePage() {
  return (
    <>
      <section className="my-auto grid h-[88vh] w-full place-content-center gap-10 py-10">
        {/* Hero section */}
        <div className="container w-full max-w-screen-xl px-4 md:px-6">
          <div className="flex flex-col items-center gap-10 text-center">
            <div className="flex flex-col gap-6">
              <h1 className="max-w-3xl font-['Barlow'] text-2xl font-bold tracking-normal sm:text-4xl md:text-5xl lg:text-6xl/none">
                Optimiza tu gestión con <span className="gradient-text">{APP_NAME}</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-balance text-[20px]">
                Herramienta de gestión de metadatos SQL, definiciones SQL, información de tablas de usuario, y más.
              </p>
            </div>

            <div></div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-bold text-muted">SOPORTE PARA</h3>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 px-4 py-4 border rounded border-border text-primary dark:border-transparent">
                <img src="microsoft-sql-server-logo.svg" width={70} height={70} alt="logo de microsoft sql server" className="max-w-none" />
                <span className="text-sm text-secondary">MSSQL Server</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-32 bg-background">
        <div className="flex flex-col max-w-screen-xl gap-6 mx-auto">
          <h3 className="text-sm font-bold text-muted">HERRAMIENTAS</h3>
          <h2 className="font-['Barlow'] text-4xl font-bold tracking-normal">
            Definiciones <span>SQL</span>
          </h2>
          <InfoSqlDefinition className="max-w-screen-xl mx-auto" />
        </div>
      </section>

      <div className="main-background"></div>
    </>
  )
}
