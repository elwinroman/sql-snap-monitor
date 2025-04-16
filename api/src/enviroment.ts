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
  ALLOWED_ORIGINS: z
    .string()
    .optional()
    .default('http://localhost:5173')
    .transform(val => val.split(',').map(url => url.trim()))
    .refine(urls => urls.every(url => z.string().url().safeParse(url).success), {
      message: 'Una o más URLs en ALLOWED_ORIGIN no son válidas',
    }),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET no puede estar vacío').default('clave_secreta_jwt'),
  SESSION_SECRET: z.string().min(1, 'SESSION_SECRET no puede estar vacío').default('clave_secreta_session'),
  PASS_PHRASE: z.string().min(1, 'PASS_PHRASE no puede estar vacío').default('clave_secreta_encriptacion'),
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
  ALLOWED_ORIGINS,
  JWT_SECRET,
  SESSION_SECRET,
  PASS_PHRASE,
} = data
