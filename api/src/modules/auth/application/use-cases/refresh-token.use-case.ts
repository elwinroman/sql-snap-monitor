import { ForTokenBlacklistPort, ForTokenManagementPort } from '@auth/domain/ports/drivens'
import { UnauthorizedException } from '@shared/domain/exceptions'
import { Logger } from '@shared/domain/logger'

export class RefreshTokenUseCase {
  constructor(
    private readonly tokenManager: ForTokenManagementPort,
    private readonly blacklist: ForTokenBlacklistPort,
    private readonly logger: Logger,
  ) {}

  async execute(dto: string): Promise<{ accessToken: string }> {
    const decodedToken = this.tokenManager.verifyRefreshToken(dto)

    // comprobar que el refresh token no esté en la blacklist
    const isRevoked = await this.blacklist.isBlacklisted(decodedToken.jti)
    if (isRevoked) {
      this.logger.warn(`Se está intentando usar un token revocado. TYPE: ${decodedToken.type} JTI: ${decodedToken.jti}`)
      throw new UnauthorizedException()
    }

    const accessToken = this.tokenManager.createAccessToken(decodedToken.user_id)

    return { accessToken }
  }
}
