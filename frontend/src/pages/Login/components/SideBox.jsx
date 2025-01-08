import { APP_NAME } from '@/constants'

export function SideBox() {
  return (
    <div className="hidden w-full h-full max-w-md p-6 login-box-background place-content-center md:grid">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-4">
          <h3 className="font-['Barlow'] text-2xl">Hola, Bienvenido</h3>
          <p className="text-center text-secondary">Usa tus credenciales SQL de tu base de datos de pruebas</p>
        </div>

        <img className="aspect-[4/3]" alt="Dashboard illustration" src="illustrations/illustration-dashboard.webp"></img>

        <h2 className="text-muted">{APP_NAME}</h2>

        <img src="microsoft-sql-server-logo.svg" width={36} height={36} alt="logo de microsoft sql server" className="max-w-none" />
      </div>
    </div>
  )
}
