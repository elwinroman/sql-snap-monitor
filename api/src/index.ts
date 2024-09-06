import 'dotenv/config'

import { createAllRouter } from './config/all.route'
import { Server } from './config/server.controller'

new Server({
  port: Number(process.env.PORT),
  routes: createAllRouter(),
  allowedOrigin: process.env.ALLOWED_ORIGIN,
}).start()
