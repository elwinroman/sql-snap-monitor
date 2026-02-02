import { ForTokenBlacklistPort, ForTokenManagementPort } from '@auth/domain/ports/drivens'
import { ForbiddenException } from '@shared/application/exceptions'
import { CacheRepository } from '@shared/domain/cache-repository'
import { Logger } from '@shared/domain/logger'
import { CacheCredentialNotFoundException } from '@shared/infrastructure/exceptions/cache/cache-credential-not-found.exception'
import { getCacheDatabaseCredentials } from '@shared/infrastructure/store'

export class RefreshTokenUseCase {
  constructor(
    private readonly tokenManager: ForTokenManagementPort,
    private readonly cacheRepository: CacheRepository,
    private readonly blacklist: ForTokenBlacklistPort,
    private readonly logger: Logger,
  ) {}

  async execute(refreshToken: string): Promise<{ accessToken: string }> {
    const decoded = this.tokenManager.verifyRefreshToken(refreshToken)

    // comprobar que el refresh token no esté en la blacklist
    const isRevoked = await this.blacklist.isBlacklisted(decoded.jti)
    if (isRevoked) {
      this.logger.warn(`[auth] Se está intentando usar un token revocado. TYPE: ${decoded.type} JTI: ${decoded.jti}`)
      throw new ForbiddenException()
    }

    // intenta recuperar las credenciales del usuario desde la caché.
    // si no existen, es probable que la caché haya sido limpiada (e.g., reinicio de infraestructura, eliminación accidental, etc.).
    const cacheCredentials = await getCacheDatabaseCredentials(decoded.user_id)
    if (!cacheCredentials) {
      // invalida el refresh token para proteger el sistema de envío de errores ya que no se encuentra la credencial asociada en la caché
      await this.cacheRepository.set(
        `blacklist:${decoded.jti}`,
        JSON.stringify({ type: decoded.type, jti: decoded.jti, user_id: decoded.user_id }),
        decoded.expirationCountdown,
      )

      throw new CacheCredentialNotFoundException(decoded.user_id)
    }

    const accessToken = this.tokenManager.createAccessToken(decoded.user_id, decoded.username)

    this.logger.info('[auth] Token de acceso renovado', {
      actionDetails: {
        userId: decoded.user_id,
        jti: decoded.jti,
        type: decoded.type,
        expirationCountdown: decoded.expirationCountdown,
      },
    })

    return { accessToken }
  }
}
