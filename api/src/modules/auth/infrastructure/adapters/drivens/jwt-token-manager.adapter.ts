import { UserAlreadyAuthenticatedException } from '@auth/domain/exceptions/user-already-authenticated.exception'
import { ForTokenManagementPort, NewTokens, TokenPayload } from '@auth/domain/ports/drivens/for-token-management.port'
import { UnauthorizedException } from '@shared/domain/exceptions'
import { ValkeyCacheRepository } from '@shared/infrastructure/cache/valkey-cache-repository'
import { Request } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { JWT_SECRET } from '@/config/enviroment'

export class JwtTokenManagerAdapter implements ForTokenManagementPort {
  createTokens(payload: TokenPayload): NewTokens {
    const accessToken = jwt.sign({ ...payload }, JWT_SECRET, { expiresIn: '14d' }) // 14 dias
    // const refreshToken = jwt.sign({ ...payload }, JWT_SECRET, { expiresIn: '30d' })

    return { accessToken }
  }

  async verifyToken(req: Request): Promise<void> {
    const token = req.cookies.access_token
    if (!token) throw new UnauthorizedException()

    const cache = new ValkeyCacheRepository()

    try {
      jwt.verify(token, JWT_SECRET)
    } catch (err: unknown) {
      // si ha expirado el token, elimina las datos de la cache
      if (err instanceof jwt.TokenExpiredError) {
        const decoded = jwt.decode(token) as JwtPayload

        if (decoded.userId) {
          await cache.delete(`credentials:${decoded.userId}`)
          await cache.delete(`session_active:${decoded.userId}`)
        }
      }

      throw new UnauthorizedException()
    }
  }

  async throwIfUserAlreadyAuthenticated(req: Request): Promise<void> {
    await this.verifyToken(req)
    // si no lanza excepción, es porque ya hay un token válido
    throw new UserAlreadyAuthenticatedException()
  }

  getBearerToken(req: Request): string | null {
    const authHeader = req.headers.authorization
    if (authHeader?.startsWith('Bearer ')) return authHeader.split(' ')[1]

    return null
  }
}
