export function HomePage() {
  return (
    <section className="grid h-full w-full place-content-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Optimiza tu gestión SQL, Aladdin está para ayudarte.
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-lg">
              Aladdin es una herramienta de gestión de bases de datos SQL que te ayuda a optimizar tu trabajo como QA Engineer, recuperando
              definiciones SQL, información de tablas de usuario, comparación de SPs, rastreo de claves foraneas y más.
            </p>
          </div>
          <div className="space-x-4"></div>
        </div>
      </div>
    </section>
  )
}
