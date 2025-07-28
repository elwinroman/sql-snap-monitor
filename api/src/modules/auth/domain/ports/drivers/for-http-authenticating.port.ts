import { AuthenticatedUser } from '@auth/domain/schemas/auth-user'
import { StoreUserSchema } from '@shared/domain/store'

import { NewTokens } from '../drivens/for-token-management.port'

export interface ForHttpAuthenticatingPort {
  login(sqlUser: StoreUserSchema): Promise<AuthenticatedUser>
  logout(tokens: NewTokens): Promise<{ message: string }>
  refreshToken(refreshToken: string): Promise<{ accessToken: string }>
  checkSession(
    credentials: StoreUserSchema,
  ): Promise<{ databaseConnection: string; viewdefinitionPermission: boolean; checkedAt: Date | string }>
  health(): void
}
