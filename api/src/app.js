import 'dotenv/config'
import { AuthModel } from './models/auth.js'
import { createAuthRouter } from './routes/auth.js'
import { createObjectRouter } from './routes/object.js'
import { ObjectModel } from './models/object.js'
import { verifyToken } from './middlewares/jwt.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { json } from 'express'
import NetworkModel from './models/network.model.js'

export default function App () {
  const root = express()
  root.use(cors({ credentials: true, origin: process.env.ALLOWED_ORIGIN }))
  root.use(json())
  root.use(cookieParser())

  // verificar token
  root.use(verifyToken)

  root.use('/api/object', createObjectRouter({ objectModel: ObjectModel }))
  root.use('/auth', createAuthRouter({ authModel: AuthModel }))

  const PORT = process.env.PORT ?? 1234

  const network = new NetworkModel(PORT)

  root.listen(PORT, network.getHost, () => {
    network.printNetworks()
  })
}
