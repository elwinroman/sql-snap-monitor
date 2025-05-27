import { AccessTokenDecoded, ForTokenBlacklistPort, ForTokenManagementPort } from '@auth/domain/ports/drivens'
import { ForbiddenException } from '@shared/application/exceptions'
import { Logger } from '@shared/domain/logger'

export class VerifyTokenUseCase {
  constructor(
    private readonly tokenManager: ForTokenManagementPort,
    private readonly blacklist: ForTokenBlacklistPort,
    private readonly logger: Logger,
  ) {}

  async execute(token: string): Promise<AccessTokenDecoded> {
    const decoded = this.tokenManager.verifyAccessToken(token)

    // comprobar que el access token no esté en la blacklist
    const isRevoked = await this.blacklist.isBlacklisted(decoded.jti)
    if (isRevoked) {
      this.logger.warn(`Se está intentando usar un token revocado. TYPE: ${decoded.type} JTI: ${decoded.jti}`)
      throw new ForbiddenException()
    }

    return decoded
  }
}
