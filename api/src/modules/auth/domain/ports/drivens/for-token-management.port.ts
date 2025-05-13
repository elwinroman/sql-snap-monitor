import { Request } from 'express'

export interface TokenPayload {
  userId: number
}

export interface NewTokens {
  accessToken: string
  // refreshToken: string
}

export interface ForTokenManagementPort {
  createTokens(payload: TokenPayload): NewTokens
  verifyToken(req: Request): Promise<void>
  throwIfUserAlreadyAuthenticated(req: Request): Promise<void>
  getBearerToken(req: Request): string | null
}
