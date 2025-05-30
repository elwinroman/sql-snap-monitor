import { Context, Logger, LoggerLevel, Message } from '@shared/domain/logger'
import pino from 'pino'

import { getLoggerRequestContext, LoggerRequestContext } from './logger-context'

export interface PinoLoggerDependencies {
  isEnabled?: boolean
  level?: LoggerLevel
}

export class PinoLogger implements Logger {
  private readonly logger

  constructor(dependencies: PinoLoggerDependencies) {
    this.logger = pino({
      level: 'debug', // permite logs de nivel debug o superior para que se imprima en consola
      enabled: dependencies.isEnabled ?? true,
      transport: {
        target: 'pino-pretty',
        options: {
          messageKey: 'message',
          colorize: true,
        },
      },
      messageKey: 'message',
    })
  }

  debug(message: Message, context?: Context): void {
    this.call('debug', message, context)
  }

  info(message: Message, context?: Context): void {
    this.call('info', message, context)
  }

  warn(message: Message, context?: Context): void {
    this.call('warn', message, context)
  }

  error(message: Message, context?: Context): void {
    this.call('error', message, context)
  }

  fatal(message: Message, context?: Context): void {
    this.call('fatal', message, context)
  }

  private call(level: pino.Level, message: Message, context?: Context) {
    const loggerContext = getLoggerRequestContext() as LoggerRequestContext | undefined

    const { request: _request, ...logContext } = loggerContext ?? {}

    const loggerMessage = {
      message,
      ...(logContext || {}), // agrega atributos del store (de request)
      ...(context || {}), // agregar atributos del contexto manual (por parámetro)
    }
    this.logger[level](loggerMessage)
  }
}
