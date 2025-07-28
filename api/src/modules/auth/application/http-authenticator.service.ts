import { NewTokens } from '@auth/domain/ports/drivens/for-token-management.port'
import { ForHttpAuthenticatingPort } from '@auth/domain/ports/drivers/for-http-authenticating.port'
import { AuthenticatedUser } from '@auth/domain/schemas/auth-user'
import { StoreUserSchema } from '@shared/domain/store'

import { CheckSessionUseCase, LoginUseCase, LogoutUseCase, RefreshTokenUseCase } from './use-cases'

export class HttpAuthenticatorService implements ForHttpAuthenticatingPort {
  constructor(
    private readonly loginUC: LoginUseCase,
    private readonly logoutUC: LogoutUseCase,
    private readonly refreshTokenUC: RefreshTokenUseCase,
    private readonly checkSessionUC: CheckSessionUseCase,
  ) {}

  async login(sqlUser: StoreUserSchema): Promise<AuthenticatedUser> {
    return this.loginUC.execute(sqlUser)
  }

  async logout(tokens: NewTokens): Promise<{ message: string }> {
    return this.logoutUC.execute(tokens)
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    return this.refreshTokenUC.execute(refreshToken)
  }

  async checkSession(
    credentials: StoreUserSchema,
  ): Promise<{ databaseConnection: string; viewdefinitionPermission: boolean; checkedAt: Date | string }> {
    return this.checkSessionUC.execute(credentials)
  }

  health(): void {
    // code here
  }
}
