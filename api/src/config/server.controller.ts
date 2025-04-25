import { correlationIdMiddleware } from '@shared/infrastructure/middlewares/correlation-id.middlware'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { json, Router } from 'express'
import session from 'express-session'

import { handleError, routeNotFound, verifyToken } from '@/middlewares'

import { NODE_ENV, SESSION_SECRET } from './enviroment'
import { NetworkController } from './network.controller'

interface Options {
  port: number
  routes: Router
  allowedOrigins: string[]
}

export class Server {
  public app = express()
  private port: number
  private routes: Router
  private allowedOrigins: string[]

  constructor(options: Options) {
    const { port, routes, allowedOrigins } = options
    this.port = port
    this.routes = routes
    this.allowedOrigins = [...allowedOrigins]
  }

  public start() {
    this.app.use(
      cors({
        credentials: true,
        origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
          // same-origin, curl
          if (!origin) return callback(null, true)

          const url = new URL(origin)
          const domain = url.hostname

          if (NODE_ENV === 'development' && domain === 'localhost') return callback(null, true)

          const isAllowed = this.allowedOrigins.some(allowedOrigin => {
            return allowedOrigin.includes(domain)
          })

          // si no se encuentra en la lista de origenes permitidos se deniega el acceso
          if (!isAllowed) {
            const msg = `Política CORS: Acceso no autorizado para ${origin}`
            return callback(new Error(msg), false)
          }
          return callback(null, true)
        },
      }),
    )
    this.app.use(correlationIdMiddleware)
    this.app.use(json())
    this.app.use(cookieParser())
    this.app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }))
    this.app.use(verifyToken)

    this.app.use(this.routes)
    this.app.use(routeNotFound)

    this.app.use(handleError)

    const network = new NetworkController(this.port)

    this.app.listen(this.port, network.gethost, () => {
      if (process.env.NODE_ENV !== 'production') network.printNetworks()
    })
  }
}
