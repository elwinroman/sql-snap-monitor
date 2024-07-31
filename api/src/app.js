// import os from 'os'
import 'dotenv/config'
import { AuthModel } from './models/auth.js'
import { createAuthRouter } from './routes/auth,js'
import { createObjectRouter } from './routes/object.js'
import { ObjectModel } from './models/object.js'
import { verifyToken } from './middlewares/jwt.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { json } from 'express'

export default function App () {
  const root = express()
  root.use(cors())
  root.use(json())
  root.use(cookieParser())

  // verificar token
  root.use(verifyToken)

  root.use('/object', createObjectRouter({ objectModel: ObjectModel }))
  root.use('/auth', createAuthRouter({ authModel: AuthModel }))

  const PORT = process.env.PORT ?? 1234
  const HOST = process.env.NODE_ENV === 'production'
    ? '0.0.0.0'
    : '127.0.0.1'

  root.listen(PORT, HOST, () => {
    console.log(`El servidor está ejecutandose en el puerto http://${HOST}:${PORT}`)
  })
}
