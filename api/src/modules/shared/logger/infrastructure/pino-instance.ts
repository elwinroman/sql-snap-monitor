import { Logger } from '../domain/logger'
import { PinoLogger } from './pino.logger'

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
