import { userRouter } from '@auth-users/infrastructure/http-api/user-router'
import { RouteNotFoundException } from '@shared/core/domain/exceptions/route-not-found.exception'
import { correlationIdMiddleware } from '@shared/core/infrastructure/middlewares/correlation-id.middleware'
import { handleError } from '@shared/core/infrastructure/middlewares/handle-error.middleware'
import express, { json } from 'express'

import { PORT } from './enviroment'

function bootstrap() {
  const app = express()

  app.use(json())
  app.use(correlationIdMiddleware)
  app.use('/user', userRouter)

  app.use(() => {
    throw new RouteNotFoundException()
  })

  app.use(handleError)

  app.listen(PORT, () => {
    console.log(`[APP] - Starting application on port ${PORT}`)
  })
}

bootstrap()
