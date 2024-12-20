import { createAllRouter } from './config/all.route'
import { ALLOWED_ORIGIN, PORT } from './config/enviroment'
import { Server } from './config/server.controller'

new Server({
  port: PORT,
  routes: createAllRouter(),
  allowedOrigin: ALLOWED_ORIGIN,
}).start()
