import { GetDatabaseInfoUseCase } from '@auth-users/aplication/get-database-info-use-case/get-database-info.use-case'
import { ValkeyCacheRepository } from '@shared/cache/infrastructure/valkey-cache-repository'
import { NextFunction, Request, Response } from 'express'

import { logger } from '@/modules/shared/logger/infrastructure/pino-instance'

import { generateUserHashId } from '../utils/generate-user-hash-id.util'

export class TestController {
  private readonly valkeyCacheRepository = new ValkeyCacheRepository()

  constructor(private readonly getDatabaseInfoUseCase: GetDatabaseInfoUseCase) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const { server, database, user, password } = req.body

    try {
      const credentials = {
        server,
        database,
        user,
        password,
      }

      const hashId = generateUserHashId({ username: user, server })

      const credencialesCache = await this.valkeyCacheRepository.get(hashId)

      if (credencialesCache) {
        logger.debug('======= OBTENIENDO LAS CREDENCIALES DE LA CACHE =========')
        logger.debug(JSON.parse(credencialesCache))
      } else {
        logger.debug('======= No existe las credenciales en la cache, SETEANDO =========')
        this.valkeyCacheRepository.set(hashId, JSON.stringify(credentials), 3600)
      }
      // const databaseInfo = this.getDatabaseInfoUseCase.execute()

      return res.json(JSON.stringify(credentials))
    } catch (err) {
      next(err)
    }
  }
}
