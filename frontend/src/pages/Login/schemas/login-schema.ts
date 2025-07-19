import * as v from 'valibot'

export const loginSchema = v.object({
  server: v.pipe(
    v.string(),
    v.nonEmpty('El nombre del servidor es requerido'),
    v.maxLength(64, 'Ha sobrepasado el maximo permitido de caracteres'),
  ),
  dbname: v.pipe(
    v.string(),
    v.nonEmpty('La base de datos es requerida'),
    v.maxLength(64, 'Ha sobrepasado el maximo permitido de caracteres'),
  ),
  username: v.pipe(v.string(), v.nonEmpty('El usuario es requerido'), v.maxLength(12, 'Ha sobrepasado el maximo permitido de caracteres')),
  password: v.pipe(
    v.string(),
    v.nonEmpty('La contraseña es requerida'),
    v.maxLength(12, 'Ha sobrepasado el maximo permitido de caracteres'),
  ),
})
