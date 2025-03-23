import { AsyncLocalStorage } from 'node:async_hooks'

// import { LoggerContext } from './'
export interface LoggerRequestContext {
  correlationId?: string
  method?: string
  url?: string
}

export const loggerRequestContext = new AsyncLocalStorage<LoggerRequestContext>()

export function setLoggerRequestContext(context: LoggerRequestContext, callback: () => void) {
  loggerRequestContext.run(context, callback)
}

export function getLoggerRequestContext(): LoggerRequestContext | undefined {
  return loggerRequestContext.getStore()
}
