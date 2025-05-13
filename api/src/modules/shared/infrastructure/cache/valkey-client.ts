import { CacheConnectionErrorException } from '@shared/domain/exceptions/cache/cache-connection-error.exception'
import { logger } from '@shared/infrastructure/logger/pino-instance'
import Valkey from 'iovalkey'

export const valkeyClient = new Valkey({
  port: 6379,
  host: '192.168.1.68',
  password: 'P@ssword123',
})

/** Eventos */
valkeyClient.on('connect', () => {
  logger.debug('Conectando a ioValkey')
})

valkeyClient.on('error', (err: unknown) => {
  const error = new CacheConnectionErrorException()

  logger.debug(CacheConnectionErrorException.name, { err })
  logger.info(CacheConnectionErrorException.name, { err: error })
  console.error('❌ Error en la conexión a la cache')

  process.exit(1)
})
