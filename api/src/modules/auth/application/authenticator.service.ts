import { AuthenticatedUser } from '@auth/domain/user'
import { ForControlAuthenticatingPort } from '@auth/ports/drivers/for-control-authenticating.port'

import { LoginDto } from './use-cases/login/login.dto'
import { LoginUseCase } from './use-cases/login/login.use-case'

export class ControlAuthenticatorService implements ForControlAuthenticatingPort {
  constructor(private readonly loginUC: LoginUseCase) {}

  async login(dto: LoginDto): Promise<AuthenticatedUser> {
    return this.loginUC.execute(dto)
  }

  logout(): void {
    // code here
  }

  health(): void {
    // code here
  }
}
