import { ProxyAuthenticatorService } from '@auth/application/proxy-authenticator.service'
import { VerifyAccessTokenUseCase } from '@auth/application/use-cases'
import { JwtTokenManagerAdapter, TokenBlacklistCacheAdapter } from '@auth/infrastructure/adapters/drivens'
import { ValkeyCacheRepository } from '@core/cache/valkey-cache-repository'
import { logger } from '@core/logger/pino-instance'

import { AuthenticatorProxyAdapter } from './authenticator-proxy-adapter'

/**********************************
 * Inyección de dependencias PROXY
 **********************************/
const compositionMock = () => {
  // DRIVENS
  const tokenManager = new JwtTokenManagerAdapter()
  const cacheRepository = new ValkeyCacheRepository()
  const blacklist = new TokenBlacklistCacheAdapter(cacheRepository)

  // USE CASES
  const verifyAccessTokenUC = new VerifyAccessTokenUseCase(tokenManager, cacheRepository, blacklist, logger)

  // SERVICE ORCHESTRATOR
  const authenticatorService = new ProxyAuthenticatorService(verifyAccessTokenUC)

  // PROXY ADAPTER
  const authenticatorProxyAdapter = new AuthenticatorProxyAdapter(authenticatorService)

  return {
    authenticatorProxyAdapter,
  }
}

export const { authenticatorProxyAdapter } = compositionMock()
