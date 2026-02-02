import { HttpAuthenticatorService } from '@auth/application/http-authenticator.service'
import { CheckSessionUseCase, LoginUseCase, LogoutUseCase, RefreshTokenUseCase } from '@auth/application/use-cases'
import {
  JwtTokenManagerAdapter,
  MssqlStoreRepositoryAdapter,
  MssqlUserRepositoryAdapter,
  TokenBlacklistCacheAdapter,
} from '@auth/infrastructure/adapters/drivens'
import { ValkeyCacheRepository } from '@shared/infrastructure/cache/valkey-cache-repository'
import { logger } from '@shared/infrastructure/logger/pino-instance'

import { CheckSessionController } from './check-session/check-session.controller'
import { LoginController } from './login/login.controller'
import { LogoutController } from './logout/logout.controller'
import { RefreshTokenController } from './refresh-token/refresh-token.controller'

/*************************************
 * Inyección de dependencias API-REST
 *************************************/
const compositionMock = () => {
  // DRIVENS
  const storeRepositoty = new MssqlStoreRepositoryAdapter() // repositorio
  const userRepository = new MssqlUserRepositoryAdapter() // repositorio
  const cacheRepository = new ValkeyCacheRepository()
  const jwtTokenManager = new JwtTokenManagerAdapter()
  const blacklist = new TokenBlacklistCacheAdapter(cacheRepository)

  // USE CASES
  const loginUseCase = new LoginUseCase(userRepository, storeRepositoty, cacheRepository, jwtTokenManager, logger)
  const logoutUseCase = new LogoutUseCase(cacheRepository, jwtTokenManager, logger)
  const refreshTokenUseCase = new RefreshTokenUseCase(jwtTokenManager, cacheRepository, blacklist, logger)
  const checkSessionUseCase = new CheckSessionUseCase(storeRepositoty, logger)

  // SERVICE ORCHESTRATOR
  const controlAuthenticatorService = new HttpAuthenticatorService(loginUseCase, logoutUseCase, refreshTokenUseCase, checkSessionUseCase)

  // CONTROLLERS
  const loginController = new LoginController(controlAuthenticatorService, jwtTokenManager)
  const logoutController = new LogoutController(controlAuthenticatorService)
  const refreshTokenController = new RefreshTokenController(controlAuthenticatorService)
  const checkSessionController = new CheckSessionController(controlAuthenticatorService)

  return {
    loginController,
    logoutController,
    refreshTokenController,
    checkSessionController,
  }
}
export const { checkSessionController, loginController, logoutController, refreshTokenController } = compositionMock()
