import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import { Loader } from '@/components/loader/Loader'
import { AlertCircle as AlertCircleIcon } from '@/icons/alert-circle'
import { useAuthStore, useSQLDefinitionStore, useUserTableStore } from '@/stores'

import { Input } from './components/Input'
import { Label } from './components/Label'
import { PasswordInput } from './components/PasswordInput'

export function LoginPage() {
  const loginUser = useAuthStore((state) => state.loginUser)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const errorAuth = useAuthStore((state) => state.errorAuth)

  const [loading, setLoading] = useState(false)

  if (isAuthenticated) return <Navigate to="/" />

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const { server, dbname, username, password } = Object.fromEntries(data)
    const credentials = {
      server: server.trim(),
      dbname: dbname.trim(),
      username: username.trim(),
      password: password.trim(),
    }

    try {
      setLoading(true)
      await loginUser({ credentials })
    } catch (err) {
      throw new Error(err)
    } finally {
      await useSQLDefinitionStore.persist.rehydrate()
      await useUserTableStore.persist.rehydrate()
      setLoading(false)
    }
  }
  return (
    <section className="flex h-screen w-full items-center overflow-auto bg-[#14161a]">
      <div className="m-auto flex w-[500px] flex-col gap-6 rounded-md bg-[#26282d] px-14 py-16">
        {/* Loader */}
        {loading && <Loader className="loader absolute left-1/2 top-1/2 opacity-80" />}

        <header className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold text-white">Iniciar sesión</h1>
          <p className="text-sm font-medium text-zinc-400">Inicia sesión con tus credenciales SQL a tu base de pruebas</p>

          {errorAuth && (
            <div className="flex gap-2 rounded-md border border-[#f53e7b59] bg-[#592e41] px-4 py-2">
              <i className="pt-0.5">
                <AlertCircleIcon width={22} height={22} />
              </i>
              <p className="text-sm text-white">{errorAuth.message}</p>
            </div>
          )}
        </header>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-0.5">
              <Label text="Server" />
              <Input name="server" />
            </div>

            <div className="flex flex-col gap-0.5">
              <Label text="Database" />
              <Input name="dbname" />
            </div>

            <div className="flex flex-col gap-0.5">
              <Label text="Usuario SQL" />
              <Input name="username" />
            </div>

            <div className="flex flex-col gap-0.5">
              <Label text="Contraseña" />
              <PasswordInput name="password" type="password" />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`w-full select-none rounded-md border border-transparent px-3 py-2 font-medium text-zinc-700 hover:bg-[#06f4aa] ${loading ? 'bg-[#00e19b] opacity-60' : 'bg-[#00e19b]'}`}
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
