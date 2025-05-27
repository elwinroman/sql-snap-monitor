import { randomUUID } from 'node:crypto'

import { TokenExpiredException } from '@auth/application/exceptions'
import {
  AccessTokenDecoded,
  AccessTokenPayload,
  ForTokenManagementPort,
  RefreshTokenDecoded,
  RefreshTokenPayload,
  TokenTypeEnum,
} from '@auth/domain/ports/drivens/for-token-management.port'
import { UnauthorizedException } from '@shared/application/exceptions'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { JWT_SECRET } from '@/config/enviroment'

export class JwtTokenManagerAdapter implements ForTokenManagementPort {
  createAccessToken(id: number): string {
    const accessTokenPaylod: AccessTokenPayload = {
      user_id: id,
      role: 'rol no definido',
      type: TokenTypeEnum.Access,
      jti: randomUUID(),
    }

    const accessToken = jwt.sign({ ...accessTokenPaylod }, JWT_SECRET, { expiresIn: '15m' }) // 15 minutos
    return accessToken
  }

  createRefreshToken(id: number): string {
    const refreshTokenPayload: RefreshTokenPayload = {
      user_id: id,
      type: TokenTypeEnum.Refresh,
      jti: randomUUID(),
    }

    const refreshToken = jwt.sign({ ...refreshTokenPayload }, JWT_SECRET, { expiresIn: '30d' }) // 30 días
    return refreshToken
  }

  verifyAccessToken(accessToken: string): AccessTokenDecoded {
    try {
      const decoded = jwt.verify(accessToken, JWT_SECRET) as JwtPayload
      const currentTime = Math.floor(Date.now() / 1000)

      if (!decoded || !decoded.jti || !decoded.exp) throw new Error('Error en la decodificación del access token')

      // tiempo de expiración que le queda en segundos
      const expirationCountdown: number = decoded.exp - currentTime

      return {
        user_id: decoded.user_id,
        role: decoded.role,
        type: decoded.type,
        jti: decoded.jti,
        expirationCountdown,
      }
    } catch (err: unknown) {
      // si ha expirado el token
      if (err instanceof jwt.TokenExpiredError) throw new TokenExpiredException(TokenTypeEnum.Access)

      throw new UnauthorizedException()
    }
  }

  verifyRefreshToken(refreshToken: string): RefreshTokenDecoded {
    try {
      const decoded = jwt.verify(refreshToken, JWT_SECRET) as JwtPayload
      const currentTime = Math.floor(Date.now() / 1000)

      if (!decoded || !decoded.jti || !decoded.exp) throw new Error('Error en la decodificación del refresh token')

      // tiempo de expiración que le queda en segundos
      const expirationCountdown: number = decoded.exp - currentTime

      return {
        user_id: decoded.user_id,
        type: decoded.type,
        jti: decoded.jti,
        expirationCountdown,
      }
    } catch (err) {
      // si ha expirado el token
      if (err instanceof jwt.TokenExpiredError) throw new TokenExpiredException(TokenTypeEnum.Refresh)

      throw new UnauthorizedException()
    }
  }

  // todo: creo que no es necesario esta función, refactorizar
  checkIfUserIsAlreadyAuthenticated(accessToken: string): boolean {
    this.verifyAccessToken(accessToken)
    return true
  }
}
