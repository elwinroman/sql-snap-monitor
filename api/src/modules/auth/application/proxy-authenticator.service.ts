import { AccessTokenDecoded } from '@auth/domain/ports/drivens/for-token-management.port'
import { ForProxyAuthenticatingPort } from '@auth/domain/ports/drivers/for-proxy-authenticating.port'

import { VerifyAccessTokenUseCase } from './use-cases'

export class ProxyAuthenticatorService implements ForProxyAuthenticatingPort {
  constructor(private readonly verifyAccessTokenUC: VerifyAccessTokenUseCase) {}

  async verifyAccessToken(token: string): Promise<AccessTokenDecoded> {
    return this.verifyAccessTokenUC.execute(token)
  }
}
