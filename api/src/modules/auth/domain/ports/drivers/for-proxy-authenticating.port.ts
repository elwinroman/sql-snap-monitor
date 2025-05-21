import { AccessTokenDecoded } from '../drivens/for-token-management.port'

export interface ForProxyAuthenticatingPort {
  verifyToken(token: string): Promise<AccessTokenDecoded>
}
