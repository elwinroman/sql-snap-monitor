import { AccessTokenDecoded } from '../drivens/for-token-management.port'

export interface ForProxyAuthenticatingPort {
  verifyAccessToken(token: string): Promise<AccessTokenDecoded>
}
