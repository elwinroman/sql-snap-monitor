import { CacheConnectionErrorException } from '@shared/infrastructure/exceptions'
import { logger } from '@shared/infrastructure/logger/pino-instance'
import Valkey from 'iovalkey'

let retryCount = 0
const maxRetries = 100 // maximos intentos de reconexión
const logRetryThreshold = 3 // primeros 3 intentos se registra el log
const logEveryN = 10 // registra cada 10 intentos

export const valkeyClient = new Valkey({
  port: 6379,
  host: '192.168.1.68',
  password: 'P@ssword123',
  retryStrategy(_times: number) {
    retryCount++

    const shouldLog = retryCount <= logRetryThreshold || retryCount % logEveryN === 0
    if (shouldLog) logger.warn(`Reintentando conexión a ioValkey (intento #${retryCount})`)

    // detener después de X reintentos
    if (retryCount > maxRetries) {
      logger.error(`Máximo de reintentos (${maxRetries}) alcanzado`)
      process.exit(1) // detiene reconexión
    }

    return Math.min(retryCount * 100, 100)
  },
})

/** Eventos */
valkeyClient.on('connect', () => {
  logger.debug('Conectado a ioValkey')
})

valkeyClient.on('error', (err: Error) => {
  if (retryCount < 1) {
    const error = new CacheConnectionErrorException(err.message)

    logger.debug(CacheConnectionErrorException.name, { err })
    logger.warn(CacheConnectionErrorException.name, { err: error })
  }
})

valkeyClient.on('end', () => {
  logger.error('La conexión a ioValkey fue cerrada permanentemente')
})
