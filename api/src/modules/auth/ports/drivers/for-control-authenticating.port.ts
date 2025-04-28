import { LoginDto } from '@auth/application/use-cases/login/login.dto'
import { AuthenticatedUser } from '@auth/domain/user'

export interface ForControlAuthenticatingPort {
  login(user: LoginDto): Promise<AuthenticatedUser>
  logout(): void
  health(): void
}
