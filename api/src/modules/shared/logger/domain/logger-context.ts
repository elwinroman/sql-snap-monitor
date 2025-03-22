import { AsyncLocalStorage } from 'node:async_hooks'

// import { LoggerContext } from './'
export interface LoggerContext {
  correlationId?: string
  method?: string
  url?: string
}

export const loggerContext = new AsyncLocalStorage<LoggerContext>()

export function setLoggerContext(context: LoggerContext, callback: () => void) {
  loggerContext.run(context, callback)
}

export function getLoggerContext(): LoggerContext | undefined {
  return loggerContext.getStore()
}
