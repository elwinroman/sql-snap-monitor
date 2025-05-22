import { ForTokenManagementPort, NewTokens } from '@auth/domain/ports/drivens'
import { CacheRepository } from '@shared/domain/cache-repository'

export class LogoutUseCase {
  constructor(
    private readonly cacheRepository: CacheRepository,
    private readonly tokenManager: ForTokenManagementPort,
  ) {}

  async execute(dto: NewTokens): Promise<{ message: string }> {
    const decodedAccessToken = this.tokenManager.verifyAccessToken(dto.accessToken)
    const decodedRefreshToken = this.tokenManager.verifyRefreshToken(dto.refreshToken)

    // todo: ¿verificar que los tokens estén en la blacklist?

    // si no han expirado los tokens, colocarlo en la blacklist para invalidarlos y no poderse reutilizars
    await this.cacheRepository.set(
      `blacklist:${decodedAccessToken.jti}`,
      JSON.stringify({ type: decodedAccessToken.type, jti: decodedAccessToken.jti, user_id: decodedAccessToken.user_id }),
      decodedAccessToken.expirationCountdown,
    )
    await this.cacheRepository.set(
      `blacklist:${decodedRefreshToken.jti}`,
      JSON.stringify({ type: decodedRefreshToken.type, jti: decodedRefreshToken.jti, user_id: decodedRefreshToken.user_id }),
      decodedRefreshToken.expirationCountdown,
    )

    return { message: 'Session cerrada correctamente.' }
  }
}
