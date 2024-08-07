import 'dotenv/config'
import { AuthModel } from './models/auth.js'
import { createAuthRouter } from './routes/auth.js'
import { createObjectRouter } from './routes/object.js'
import { ObjectModel } from './models/object.js'
import { verifyToken } from './middlewares/jwt.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { json } from 'express'
import os from 'os'

export default function App () {
  const root = express()
  root.use(cors())
  root.use(json())
  root.use(cookieParser())

  // verificar token
  root.use(verifyToken)

  root.use('/api/object', createObjectRouter({ objectModel: ObjectModel }))
  root.use('/auth', createAuthRouter({ authModel: AuthModel }))

  const PORT = process.env.PORT ?? 1234
  const HOST = process.argv.find((arg) => arg === '--host')
    ? '0.0.0.0'
    : '127.0.0.1'

  // expose network soporte solo para windows
  const NETWPORK_IP4 = os.networkInterfaces().Ethernet.find((element) => {
    return element.family === 'IPv4'
  }).address

  root.listen(PORT, HOST, () => {
    console.log(`➜ Local: http://${HOST}:${PORT}`)

    HOST === '0.0.0.0'
      ? console.log(`➜ Network: http://${NETWPORK_IP4}:${PORT}`)
      : console.log('➜ Network: use --host to expose')
  })
}
