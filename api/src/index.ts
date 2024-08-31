import 'dotenv/config'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { json } from 'express'

import { verifyToken } from './middlewares/jwt'
import { AuthModel } from './models/auth'
import NetworkModel from './models/network.model'
import { ObjectModel } from './models/object'
import { createAuthRouter } from './routes/auth'
import { createObjectRouter } from './routes/object'

export default function App() {
  const root = express()
  root.use(cors({ credentials: true, origin: process.env.ALLOWED_ORIGIN }))
  root.use(json())
  root.use(cookieParser())

  // verificar token
  root.use(verifyToken)

  root.use('/api/object', createObjectRouter({ objectModel: ObjectModel }))
  root.use('/auth', createAuthRouter({ authModel: AuthModel }))

  const PORT = Number(process.env.PORT) ?? 1234

  const network = new NetworkModel(PORT)

  root.listen(PORT, network.getHost, () => {
    network.printNetworks()
  })
}

App()
