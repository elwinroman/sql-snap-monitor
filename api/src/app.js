import 'dotenv/config'
import { createObjectRouter } from './routes/object.js'
import { ObjectModel } from './models/object.js'
import cors from 'cors'
import express from 'express'

export default function App () {
  const root = express()
  root.use(cors())

  root.use('/object', createObjectRouter({ objectModel: ObjectModel }))

  const PORT = process.env.PORT ?? 1234
  const HOST = process.env.NODE_ENV === 'production'
    ? '0.0.0.0'
    : '127.0.0.1'

  root.listen(PORT, HOST, () => {
    console.log(`El servidor está ejecutandose en el puerto http://${HOST}:${PORT}`)
  })
}
