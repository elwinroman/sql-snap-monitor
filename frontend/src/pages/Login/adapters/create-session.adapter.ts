import { AuthenticatedUserApiResponse } from '@/models/api/authenticated-user-api-response.model'
import { AuthContext } from '@/models/auth-context.model'

export const createSessionAdapter = (authenticatedUser: AuthenticatedUserApiResponse): AuthContext => {
  return {
    database: authenticatedUser.data.storeDetails.name,
    server: authenticatedUser.data.storeDetails.server,
    username: authenticatedUser.data.user,
    prodDatabase: 'SI_FinFinanciero',
    serverAliasName: authenticatedUser.data.aliasHost,
  }
}
