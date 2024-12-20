import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  PREPROD_DBSERVER: z.string({ message: 'PREPROD_DBSERVER es obligatorio' }).min(1, 'PREPROD_DBSERVER no puede estar vacío'),
  PREPROD_DBNAME: z.string({ message: 'PREPROD_DBNAME es obligatorio' }).min(1, 'PREPROD_DBNAME no puede estar vacío'),
  PREPROD_DBUSERNAME: z.string({ message: 'PREPROD_DBUSERNAME es obligatorio' }).min(1, 'PREPRODDB_USERNAME no puede estar vacío'),
  PREPROD_DBPASSWORD: z.string({ message: 'PREPROD_DBPASSWORD es obligatorio' }).min(1, 'PREPRODDB_PASSWORD no puede estar vacío'),

  DBSERVER: z.string({ message: 'DBSERVER es obligatorio' }).min(1, 'DBSERVER no puede estar vacío'),
  DBNAME: z.string({ message: 'DBNAME es obligatorio' }).min(1, 'DBNAME no puede estar vacío'),
  DBUSERNAME: z.string({ message: 'DBUSERNAME es obligatorio' }).min(1, 'DBUSERNAME no puede estar vacío'),
  DBPASSWORD: z.string({ message: 'PREPROD_DBSERVER es obligatorio' }).min(1, 'DBPASSWORD no puede estar vacío'),

  PORT: z
    .string()
    .min(1, 'PORT no puede estar vacío')
    .default('3000')
    .transform(val => Number(val))
    .pipe(z.number({ message: 'PORT debe ser un número' })),
  ALLOWED_ORIGIN: z
    .string()
    .url({ message: 'URL inválida' })
    .min(1, 'ALLOWED_ORIGIN no puede estar vacío')
    .default('http://localhost:5173'),
  JWT_SECRET: z
    .string()
    .min(1, 'JWT_SECRET no puede estar vacío')
    .default(
      '79e994b74e85f0d96c963b44287844feeee5edd04bd26cf354199f1843429cea72557a04945a4eb08cb5a548c64cc5c83172c5838bfc04711c1e414bdcf53fbd',
    ),
  SESSION_SECRET: z
    .string()
    .min(1, 'SESSION_SECRET no puede estar vacío')
    .default('f8fc8dbaa5806006a7710d6cbd98dacba7d579de80e639e4705d42c7ac91ee56'),
  INIT_VECTOR: z
    .string()
    .min(16, 'INIT_VECTOR tiene que ser de 16 caracteres')
    .max(16, 'INIT_VECTOR tiene que ser de 16 caracteres')
    .default('CzgberY2qaQDDy1z'),
  PASS_PHRASE: z
    .string()
    .min(1, 'PASS_PHRASE no puede estar vacío')
    .default('C0553C58301E2B9FC2D7D78ABB886B6CB923C55E0BAFAEEA5BB703D60104C24E'),
})

const { data, error, success } = envSchema.safeParse(process.env)

// Detener ejecución si las variables de entorno son inválidas
if (!success) {
  console.error('❌ Error en las variables de entorno', error.format())
  process.exit(1)
}

// Variables de entorno
export const {
  PREPROD_DBSERVER,
  PREPROD_DBNAME,
  PREPROD_DBUSERNAME,
  PREPROD_DBPASSWORD,
  DBSERVER,
  DBNAME,
  DBUSERNAME,
  DBPASSWORD,
  PORT,
  ALLOWED_ORIGIN,
  JWT_SECRET,
  SESSION_SECRET,
  INIT_VECTOR,
  PASS_PHRASE,
} = data
