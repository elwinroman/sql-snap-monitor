import { AccessTokenDecoded } from '../domain/ports/drivens/for-token-management.port'
import { ForProxyAuthenticatingPort } from '../domain/ports/drivers/for-proxy-authenticating.port'
import { VerifyTokenUseCase } from './use-cases'

export class ProxyAuthenticatorService implements ForProxyAuthenticatingPort {
  constructor(private readonly verifyTokenUC: VerifyTokenUseCase) {}

  async verifyToken(token: string): Promise<AccessTokenDecoded> {
    return this.verifyTokenUC.execute(token)
  }
}
