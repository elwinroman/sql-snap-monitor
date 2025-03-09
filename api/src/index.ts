import express, { json } from 'express'

import { PORT } from './enviroment'
import { correlationIdMiddleware } from './modules/shared/infrastructure/correlation-id-middleware'
import { userRouter } from './modules/users/infrastructure/http-api/user-router'

function bootstrap() {
  const app = express()

  app.use(json())
  app.use(correlationIdMiddleware)
  app.use('/user', userRouter)

  app.listen(PORT, () => {
    console.log(`[APP] - Starting application on port ${PORT}`)
  })
}

bootstrap()
