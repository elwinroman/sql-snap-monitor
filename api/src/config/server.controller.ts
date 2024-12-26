import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { json, Router } from 'express'
import session from 'express-session'

import { handleError, routeNotFound, verifyToken } from '@/middlewares'

import { SESSION_SECRET } from './enviroment'
import { NetworkController } from './network.controller'

interface Options {
  port: number
  routes: Router
  allowedOrigin: string
}

export class Server {
  public app = express()
  private port: number
  private routes: Router
  private allowedOrigin: string

  constructor(options: Options) {
    const { port, routes, allowedOrigin } = options
    this.port = port
    this.routes = routes
    this.allowedOrigin = allowedOrigin
  }

  public start() {
    this.app.use(cors({ credentials: true, origin: this.allowedOrigin }))
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
