import { PermissionDenyException } from '@auth/domain/exceptions/permission-deny.exceptions'
import { ForStoreRepositoryPort } from '@auth/domain/ports/drivens/for-store-repository.port'
import { ForTokenManagementPort } from '@auth/domain/ports/drivens/for-token-management.port'
import { ForUserRepositoryPort } from '@auth/domain/ports/drivens/for-user-repository.port'
import { AuthenticatedUser } from '@auth/domain/schemas/auth-user'
import { User } from '@auth/domain/schemas/user'
import { CacheRepository } from '@shared/domain/cache-repository'

import { LoginDto } from './login.dto'

export class LoginUseCase {
  constructor(
    private readonly userRepository: ForUserRepositoryPort,
    private readonly storeRepository: ForStoreRepositoryPort,
    private readonly cacheRepository: CacheRepository,
    private readonly tokenManager: ForTokenManagementPort,
  ) {}

  async execute(dto: LoginDto): Promise<AuthenticatedUser> {
    const details = await this.storeRepository.getDetails(dto)
    const permissionStore = await this.storeRepository.getPermission(dto)

    const user = User.create({
      user: dto.user,
      host: details.server,
      aliasHost: dto.host,
    })

    const repoUser = await this.userRepository.getOrCreate(user.toValue())

    // cuando el usuario no se puedo crear
    if (!repoUser) throw new Error('Error al obtener y/o crear el usuario')

    // denegar acceso a la aplicación a un usuario desactivado
    if (repoUser.isActive === false) throw new PermissionDenyException()

    // genera el token
    const { accessToken } = this.tokenManager.createTokens({ userId: repoUser.id })
    await this.cacheRepository.set(`auth:credentials:${repoUser.id}`, JSON.stringify(dto), 1209600) // 14 días
    await this.cacheRepository.set(`auth:session_active:${repoUser.id}`, 'true', 1209600) // 14 dias

    return {
      id: repoUser.id,
      user: repoUser.user,
      aliasHost: repoUser.aliasHost,
      token: { accessToken },
      storeDetails: { ...details, ...permissionStore },
    }
  }
}
