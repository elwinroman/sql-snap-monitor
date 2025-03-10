import express, { json } from 'express'

import { PORT } from './enviroment'
import { correlationIdMiddleware } from './modules/shared/infrastructure/middlewares/correlation-id.middleware'
import { handleError } from './modules/shared/infrastructure/middlewares/handle-error.middleware'
import { userRouter } from './modules/users/infrastructure/http-api/user-router'

function bootstrap() {
  const app = express()

  app.use(json())
  app.use(correlationIdMiddleware)
  app.use('/user', userRouter)

  app.use(handleError)

  app.listen(PORT, () => {
    console.log(`[APP] - Starting application on port ${PORT}`)
  })
}

bootstrap()
