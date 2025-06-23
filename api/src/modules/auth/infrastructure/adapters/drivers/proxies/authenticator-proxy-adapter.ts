import { AccessTokenDecoded } from '@auth/domain/ports/drivens/for-token-management.port'
import { ForProxyAuthenticatingPort } from '@auth/domain/ports/drivers/for-proxy-authenticating.port'

export class AuthenticatorProxyAdapter {
  constructor(private readonly authenticatorService: ForProxyAuthenticatingPort) {}

  async verifyAccessToken(token: string): Promise<AccessTokenDecoded> {
    return await this.authenticatorService.verifyAccessToken(token)
  }
}
