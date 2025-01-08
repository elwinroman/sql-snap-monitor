import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { AlertCircle as AlertCircleIcon } from '@/icons/alert-circle'
import { useAuthStore, useSQLDefinitionStore, useUserTableStore } from '@/stores'

import { Input, Label, PasswordInput } from '../components'

export function Form({ loading, setLoading }) {
  const errorAuth = useAuthStore((state) => state.errorAuth)
  const [errorAPI, setErrorAPI] = useState(false)
  const loginUser = useAuthStore((state) => state.loginUser)

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
  )
}
