import { ProxyAuthenticatorService } from '@auth/application/proxy-authenticator.service'
import { VerifyTokenUseCase } from '@auth/application/use-cases'
import { JwtTokenManagerAdapter, TokenBlacklistCacheAdapter } from '@auth/infrastructure/adapters/drivens'
import { ValkeyCacheRepository } from '@shared/infrastructure/cache/valkey-cache-repository'
import { logger } from '@shared/infrastructure/logger/pino-instance'

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
  const verifyTokenUC = new VerifyTokenUseCase(tokenManager, blacklist, logger)

  // SERVICE ORCHESTRATOR
  const authenticatorService = new ProxyAuthenticatorService(verifyTokenUC)

  // ADAPTER
  const authenticatorProxyAdapter = new AuthenticatorProxyAdapter(authenticatorService)

  return {
    authenticatorProxyAdapter,
  }
}

export const { authenticatorProxyAdapter } = compositionMock()
