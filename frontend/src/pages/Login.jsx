import { useAuthStore } from '@/stores/auth.store'
import { useRef } from 'react'

export function LoginPage() {
  const loginUser = useAuthStore((state) => state.loginUser)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const element = useRef({
    server: 'server',
    database: 'database',
    username: 'username',
    password: 'password',
  })

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const { server, database, username, password } = Object.fromEntries(data)
    const credentials = {
      server,
      dbname: database,
      username,
      password,
    }

    try {
      await loginUser({ credentials })
      console.log(isAuthenticated)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <section className="flex h-screen w-full items-center bg-[#14161a]">
      <div className="m-auto flex w-[500px] flex-col gap-8 rounded-md bg-[#26282d] px-14 py-16">
        <header className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold text-white">Iniciar sesión</h1>
          <p className="font-medium text-zinc-400">
            Hoy es un buen día para revisar tus SPs, Tablas, etc. Inicia sesión
            con tus credenciales SQL
          </p>
        </header>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="flex gap-1">
                <span>Server</span>
                <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                name="server"
                id={element.server}
                className="rounded-md border border-transparent bg-[#3c3e42] px-3 py-2 text-sm outline-none transition-colors duration-300 hover:border-[#00e19b] focus:border-[#00e19b] focus:bg-[#00e19b1a]"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="flex gap-1">
                <span>Database</span>
                <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                name="database"
                id={element.database}
                className="rounded-md border border-transparent bg-[#3c3e42] px-3 py-2 text-sm outline-none transition-colors duration-300 hover:border-[#00e19b] focus:border-[#00e19b] focus:bg-[#00e19b1a]"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="flex gap-1">
                <span>Usuario</span>
                <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                name="username"
                id={element.username}
                className="rounded-md border border-transparent bg-[#3c3e42] px-3 py-2 text-sm outline-none transition-colors duration-300 hover:border-[#00e19b] focus:border-[#00e19b] focus:bg-[#00e19b1a]"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="flex gap-1">
                <span>Contraseña</span>
                <span className="text-rose-600">*</span>
              </label>
              <input
                type="password"
                name="password"
                id={element.password}
                className="rounded-md border border-transparent bg-[#3c3e42] px-3 py-2 text-sm outline-none transition-colors duration-300 hover:border-[#00e19b] focus:border-[#00e19b] focus:bg-[#00e19b1a]"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-md border border-transparent bg-[#00e19b] px-3 py-2 font-medium text-zinc-700 hover:bg-[#06f4aa]"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
