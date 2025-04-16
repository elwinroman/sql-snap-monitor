import { generateUserHashId } from '@/modules/auth-users/infrastructure/utils/generate-user-hash-id.util'
import { ExternalUser } from '@/modules/users/domain/schemas'

import { ForStoreRepositoryProvider } from '../ports/drivens/for-store-repository-provider'
import { ForUserManagementProvider } from '../ports/drivens/for-user-management-provider'
import { AuthenticatedUser, ForAuthenticating, Status } from '../ports/drivers/for-authenticating'

export class AuthenticatorService implements ForAuthenticating {
  constructor(
    private readonly userManagement: ForUserManagementProvider,
    private readonly storeRepository: ForStoreRepositoryProvider,
  ) {}

  async login(user: ExternalUser): Promise<AuthenticatedUser> {
    // intenta el login y si es correcto recupera los detalles del store (database, etc)
    const store = await this.storeRepository.getDetails()

    // genera el hashID único del usuario sql para su búsqueda, se usa este paso porque no existe un register()
    const userHashId = generateUserHashId({ username: user.user, server: store.server })
    let authenticatedUser = await this.userManagement.getUser(userHashId)

    // registra usuario sql en la base de datos si no existe
    if (!authenticatedUser) {
      authenticatedUser = await this.userManagement.createUser(user)
    }

    // await this.registerLogAccessUseCase.execute()

    // const accessToken = generateAccessToken(user)
    // const refreshToken = generateRefreshToken()

    return { userInfo: { id: authenticatedUser.id, user: authenticatedUser.user }, storeRepoInfo: store }
  }

  async logout(): Promise<void> {}

  async health(): Promise<Status> {
    return {
      date: new Date(),
      viewDefinitionPermision: true,
    }
  }
}
