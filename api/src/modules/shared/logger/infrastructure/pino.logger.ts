import { Context, Logger, LoggerLevel, Message } from '@shared/logger/domain/logger'
import { getLoggerRequestContext } from '@shared/logger/domain/logger-context'
import pino from 'pino'

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
      // messageKey: 'message',
      transport: {
        target: 'pino-pretty',
        options: {
          messageKey: 'message',
          colorize: true,
        },
      },
      messageKey: 'message',
      // customProps: (req: Request),
      // level: this.getGetPinoLevelFrom(dependencies.level || 'info'),
      // formatters: {
      //   level: (label: string, level: number) => {
      //     return {
      //       severity: this.getSeverityLevel(label),
      //       level,
      //     }
      //   },
      // },
      // base: undefined,
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
    const storeRequestContext = getLoggerRequestContext()

    const loggerMessage = {
      message,
      ...(storeRequestContext || {}), // agrega atributos del store (de request)
      ...(context || {}), // agregar atributos del contexto manual (por parámetro)
    }
    this.logger[level](loggerMessage)
  }

  private getSeverityLevel(label: string) {
    const pinoLevelToSeverityLookup: Record<pino.Level, string> = {
      trace: 'DEBUG',
      debug: 'DEBUG',
      info: 'INFO',
      warn: 'WARNING',
      error: 'ERROR',
      fatal: 'CRITICAL',
    }

    return pinoLevelToSeverityLookup[label as pino.Level] || pinoLevelToSeverityLookup.info
  }

  private getGetPinoLevelFrom(loggerLevel: LoggerLevel): pino.Level {
    const loggerLevelToPinoLevelMap: Record<LoggerLevel, pino.Level> = {
      debug: 'debug',
      info: 'info',
      warn: 'warn',
      error: 'error',
      fatal: 'fatal',
    }

    return loggerLevelToPinoLevelMap[loggerLevel]
  }
}
