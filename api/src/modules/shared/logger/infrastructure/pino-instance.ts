import { Logger } from '@shared/logger/domain/logger'

import { PinoLogger } from './pino.logger'

/**
 * Clase Singleton para gestionar una instancia única de un logger (evitar sobrecarga).
 * Utiliza PinoLogger como implementación del logger.
 * Exporta la misma instancia ya creada
 */
class LoggerSingleton {
  private static instance: Logger

  private constructor() {}

  public static getInstance(): Logger {
    if (!LoggerSingleton.instance) {
      LoggerSingleton.instance = new PinoLogger({ level: 'info' })
    }
    return LoggerSingleton.instance
  }
}

export const logger = LoggerSingleton.getInstance()
