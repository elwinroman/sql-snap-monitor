import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  PREPROD_DBSERVER: z.string().min(1),
  PREPROD_DBNAME: z.string().min(1),
  PREPROD_DBUSERNAME: z.string().min(1),
  PREPROD_DBPASSWORD: z.string().min(1),

  DBSERVER: z.string().min(1),
  DBNAME: z.string().min(1),
  DBUSERNAME: z.string().min(1),
  DBPASSWORD: z.string().min(1),

  FINLOG_DBSERVER: z.string().min(1),
  FINLOG_DBNAME: z.string().min(1),
  FINLOG_DBUSERNAME: z.string().min(1),
  FINLOG_DBPASSWORD: z.string().min(1),

  PORT: z
    .string()
    .min(1)
    .default('3000')
    .transform(val => Number(val))
    .pipe(z.number()),
  ALLOWED_ORIGINS: z
    .string()
    .optional()
    .default('http://192.168.1.68')
    .transform(val => val.split(',').map(url => url.trim()))
    .refine(urls => urls.every(url => z.string().url().safeParse(url).success), {
      message: 'Una o más URLs en ALLOWED_ORIGIN no son válidas',
    }),
  JWT_SECRET: z.string().min(1).default('your-jwt-secret-key'),
  SESSION_SECRET: z.string().min(1).default('your-session-secret-key'),
  PASS_PHRASE: z.string().min(1).default('your-pass-phrase-key'),
  SENTRY_REPORTING_ENABLED: z.preprocess(val => val === 'true', z.boolean()).default(false),
  SENTRY_DNS: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']).optional().default('development'),

  // Logging centralizado con Grafana Loki
  LOKI_REPORTING_ENABLED: z.preprocess(val => val === 'true', z.boolean()).default(false),
  LOKI_HOST: z.string().url().optional(),
  LOKI_USERNAME: z.string().optional(),
  LOKI_PASSWORD: z.string().optional(),
  LOKI_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error', 'fatal']).optional().default('info'),

  // Configuración zonas horarias
  TIMEZONE_DATABASE: z.string().default('America/Lima'),
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

  FINLOG_DBSERVER,
  FINLOG_DBNAME,
  FINLOG_DBUSERNAME,
  FINLOG_DBPASSWORD,

  PORT,
  ALLOWED_ORIGINS,
  JWT_SECRET,
  SESSION_SECRET,
  PASS_PHRASE,
  SENTRY_REPORTING_ENABLED,
  SENTRY_DNS,
  NODE_ENV,

  LOKI_REPORTING_ENABLED,
  LOKI_HOST,
  LOKI_USERNAME,
  LOKI_PASSWORD,
  LOKI_LOG_LEVEL,

  TIMEZONE_DATABASE,
} = data
