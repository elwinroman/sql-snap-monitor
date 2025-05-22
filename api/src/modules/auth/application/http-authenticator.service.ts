import { ForHttpAuthenticatingPort } from '@auth/domain/ports/drivers/for-http-authenticating.port'
import { AuthenticatedUser } from '@auth/domain/schemas/auth-user'
import { StoreUserSchema } from '@shared/domain/store'

import { NewTokens } from '../domain/ports/drivens/for-token-management.port'
import { StoreInfo } from '../domain/schemas/store'
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

  async logout(dto: NewTokens): Promise<{ message: string }> {
    return this.logoutUC.execute(dto)
  }

  async refreshToken(dto: string): Promise<{ accessToken: string }> {
    return this.refreshTokenUC.execute(dto)
  }

  async checkSession(id: number): Promise<StoreInfo> {
    return this.checkSessionUC.execute(id)
  }

  health(): void {
    // code here
  }
}
