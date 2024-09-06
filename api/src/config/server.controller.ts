import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { json, Router } from 'express'
import session from 'express-session'

import { handleError } from '@/middlewares/handle-error'
import { verifyToken } from '@/middlewares/jwt'

import { NetworkController } from './network.controller'

interface Options {
  port?: number
  routes: Router
  allowedOrigin?: string
}

export class Server {
  public app = express()
  private port: number
  private routes: Router
  private allowedOrigin: string

  constructor(options: Options) {
    const { port = 3000, routes, allowedOrigin = '*' } = options

    this.port = port
    this.routes = routes
    this.allowedOrigin = allowedOrigin
  }

  public start() {
    this.app.use(cors({ credentials: true, origin: process.env.ALLOWED_ORIGIN }))
    this.app.use(json())
    this.app.use(cookieParser())
    this.app.use(session({ secret: process.env.SESSION_SECRET as string, resave: false, saveUninitialized: false }))
    this.app.use(verifyToken)

    this.app.use(this.routes)

    this.app.use(handleError)

    const network = new NetworkController(this.port)

    this.app.listen(this.port, network.gethost, () => {
      network.printNetworks()
    })
  }
}
