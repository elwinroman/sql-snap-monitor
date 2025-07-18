import { useState } from 'react'
import { safeParse } from 'valibot'

import { Button } from '@/components/ui/button'
import { AlertCircle as AlertCircleIcon } from '@/icons/alert-circle'

import { useLoginContext } from '../hooks/useLoginContext'
import { loginSchema } from '../schemas/login-schema'
import { Input, Label, PasswordInput } from './'

export function Form() {
  const { login, loading, error } = useLoginContext()
  const [formErrors, setFormErrors] = useState<Record<string, string> | null>(null)

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const rawData = Object.fromEntries(data)

    // validar formulario
    const parsed = safeParse(loginSchema, rawData)

    // errores en la validación de formulario
    if (!parsed.success) {
      // mapea errores a un objeto clave/valor
      const errors: Record<string, string> = {}
      for (const issue of parsed.issues) {
        if (issue.path && issue.path.length > 0) {
          const field = issue.path[0].key as string
          errors[field] = issue.message
        }
      }
      setFormErrors(errors)
      return
    }

    const credentials = parsed.output

    // LOGIN
    try {
      await login(credentials)
    } catch (err) {
      console.error('Error al hacer login: ', err)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <Label text="Server" />
          <Input name="server" placeholder="Ingresa el nombre de tu servidor" defaultValue="DeSKTOP-M41n" />
          {formErrors?.server && <p className="mt-0.5 text-xs text-red-500">{formErrors.server}</p>}
        </div>

        <div className="flex flex-col gap-0.5">
          <Label text="Database" />
          <Input name="dbname" placeholder="Ingresa el nombre de tu BD" defaultValue="Adventureworks2022" />
          {formErrors?.dbname && <p className="mt-0.5 text-xs text-red-500">{formErrors.dbname}</p>}
        </div>

        <div className="flex flex-col gap-0.5">
          <Label text="Usuario SQL" />
          <Input name="username" placeholder="Ingresa tu usuario SQL" />
          {formErrors?.username && <p className="mt-0.5 text-xs text-red-500">{formErrors.username}</p>}
        </div>

        <div className="flex flex-col gap-0.5">
          <Label text="Contraseña" />
          <PasswordInput name="password" />
          {formErrors?.password && <p className="mt-0.5 text-xs text-red-500">{formErrors.password}</p>}
        </div>
      </div>

      <div>
        <Button type="submit" className="w-full" variant={loading ? 'disabled' : 'default'}>
          Iniciar sesión
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-md bg-[#B71D18] px-4 py-2">
          <i className="pt-0.5">
            <AlertCircleIcon width={22} height={22} />
          </i>
          <p className="text-sm text-white">{error.detail}</p>
        </div>
      )}
    </form>
  )
}
