import { PermissionDenyException } from '@auth/domain/exceptions'
import { ForStoreRepositoryPort, ForTokenManagementPort, ForUserRepositoryPort } from '@auth/domain/ports/drivens'
import { AuthenticatedUser } from '@auth/domain/schemas/auth-user'
import { User } from '@auth/domain/schemas/user'
import { CacheRepository } from '@shared/domain/cache-repository'
import { StoreUserSchema } from '@shared/domain/store'
import cryptocodeUtil from '@shared/infrastructure/utils/cryptocode.util'

import { NODE_ENV } from '@/config/enviroment'
import { MODE } from '@/constants'

export class LoginUseCase {
  constructor(
    private readonly userRepository: ForUserRepositoryPort,
    private readonly storeRepository: ForStoreRepositoryPort,
    private readonly cacheRepository: CacheRepository,
    private readonly tokenManager: ForTokenManagementPort,
  ) {}

  async execute(sqlUser: StoreUserSchema): Promise<AuthenticatedUser> {
    // encriptación de las credenciales del usuario
    const credential = {
      host: sqlUser.host,
      database: sqlUser.database,
      user: NODE_ENV === MODE.development ? sqlUser.user : cryptocodeUtil.encrypt(sqlUser.user),
      password: NODE_ENV === MODE.development ? sqlUser.password : cryptocodeUtil.encrypt(sqlUser.password),
    }

    const details = await this.storeRepository.getDetails(credential)
    const permissionStore = await this.storeRepository.getPermission(credential)

    const user = User.create({
      user: sqlUser.user,
      host: details.server,
      aliasHost: sqlUser.host,
    })

    // se pasa los datos del usuario y el nombre de la base de datos
    const repoUser = await this.userRepository.getOrCreate(user.toValue(), details.name)

    // cuando el usuario no se puedo crear
    if (!repoUser) throw new Error('Error al obtener y/o crear el usuario')

    // denegar acceso a la aplicación a un usuario desactivado
    if (repoUser.isActive === false) throw new PermissionDenyException()

    // genera el token y las credenciales las guarda en cache (el tiempo se actualiza con la última sesión)
    const accessToken = this.tokenManager.createAccessToken(repoUser.id, repoUser.user)
    const refreshToken = this.tokenManager.createRefreshToken(repoUser.id, repoUser.user)
    await this.cacheRepository.set(`auth:credentials:${repoUser.id}`, JSON.stringify(credential), 2592000) // 30 días

    return {
      id: repoUser.id,
      user: repoUser.user,
      aliasHost: repoUser.aliasHost,
      token: { accessToken, refreshToken },
      storeDetails: { ...details, ...permissionStore },
    }
  }
}
