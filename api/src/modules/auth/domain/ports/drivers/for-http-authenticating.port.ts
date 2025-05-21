import { AuthenticatedUser } from '@auth/domain/schemas/auth-user'
import { StoreInfo } from '@auth/domain/schemas/store'
import { StoreUserSchema } from '@shared/domain/store'

import { NewTokens } from '../drivens/for-token-management.port'

export interface ForHttpAuthenticatingPort {
  login(sqlUser: StoreUserSchema): Promise<AuthenticatedUser>
  logout(dto: NewTokens): Promise<{ message: string }>
  refreshToken(dto: string): Promise<{ accessToken: string }>
  checkSession(id: number): Promise<StoreInfo>
  health(): void
}
