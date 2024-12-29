import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import { Loader } from '@/components/loader/Loader'
import { Button } from '@/components/ui/button'
import { AlertCircle as AlertCircleIcon } from '@/icons/alert-circle'
import { useAuthStore, useSQLDefinitionStore, useUserTableStore } from '@/stores'

import { Input } from './components/Input'
import { Label } from './components/Label'
import { PasswordInput } from './components/PasswordInput'

export function LoginPage() {
  const [errorAPI, setErrorAPI] = useState(false)
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
      setErrorAPI(true)
      throw new Error(err)
    } finally {
      await useSQLDefinitionStore.persist.rehydrate()
      await useUserTableStore.persist.rehydrate()
      setLoading(false)
    }
  }
  return (
    <section className="flex h-screen w-full items-center overflow-auto bg-background">
      {/* Welcome right  */}
      <div className="login-box-background hidden h-full w-full max-w-md place-content-center p-6 md:grid">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <h3 className="font-['Barlow'] text-2xl">Hola, Bienvenido</h3>
            <p className="text-secondary">Se eficaz en la gestión de metadatos SQL</p>
          </div>

          <img className="aspect-[4/3]" alt="Dashboard illustration" src="illustrations/illustration-dashboard.webp"></img>

          <h2 className="text-muted">SQL Snap Monitor</h2>

          <img src="microsoft-sql-server-logo.svg" width={36} height={36} alt="logo de microsoft sql server" className="max-w-none" />
        </div>
      </div>

      {/* Formulario */}
      <div className="m-auto flex w-[480px] flex-col gap-6 rounded-md px-10 py-10">
        {/* Loader */}
        {loading && <Loader className="loader absolute left-1/2 top-1/2 opacity-80" />}

        <header className="flex flex-col items-center gap-3">
          <h1 className="text-xl font-bold text-primary">Inicia sesión con tu cuenta</h1>
          <p className="text-sm text-secondary">Usa tus credenciales SQL de tu base de datos de pruebas</p>
        </header>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-0.5">
              <Label text="Server" />
              <Input name="server" placeholder="Ingresa el nombre de tu servidor" />
            </div>

            <div className="flex flex-col gap-0.5">
              <Label text="Database" />
              <Input name="dbname" placeholder="Ingresa el nombre de tu BD" />
            </div>

            <div className="flex flex-col gap-0.5">
              <Label text="Usuario SQL" />
              <Input name="username" placeholder="Ingresa tu usuario SQL" />
            </div>

            <div className="flex flex-col gap-0.5">
              <Label text="Contraseña" />
              <PasswordInput name="password" type="password" />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full" variant={loading ? 'disabled' : 'default'}>
              Iniciar sesión
            </Button>
          </div>

          {errorAuth && (
            <div className="flex items-center gap-2 rounded-md border border-[#f53e7b59] bg-[#592e41] px-4 py-2">
              <i className="pt-0.5">
                <AlertCircleIcon width={22} height={22} />
              </i>
              <p className="text-sm text-white">{errorAuth.message}</p>
            </div>
          )}
          {errorAPI && (
            <div className="flex items-center gap-2 rounded-md border border-[#f53e7b59] bg-[#592e41] px-4 py-2">
              <i className="pt-0.5">
                <AlertCircleIcon width={22} height={22} />
              </i>
              <p className="text-sm text-white">Internar Server Error 500</p>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
