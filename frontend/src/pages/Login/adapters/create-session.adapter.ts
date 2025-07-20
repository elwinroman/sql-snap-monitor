import { AuthenticatedUser } from '@/models/auth/authenticated-user.model'
import { AuthContext } from '@/models/auth-context.model'

export const createSessionAdapter = (authenticatedUser: AuthenticatedUser): AuthContext => {
  return {
    database: authenticatedUser.databaseInfo.name,
    server: authenticatedUser.databaseInfo.server,
    username: authenticatedUser.username,
    prodDatabase: 'SI_FinFinanciero',
    originalServer: authenticatedUser.originalServer,
  }
}
