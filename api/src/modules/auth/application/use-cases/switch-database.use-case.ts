import { ForStoreRepositoryPort } from '@auth/domain/ports/drivens'
import { PermissionStore, StoreInfo } from '@auth/domain/schemas/store'
import { CacheCredentialNotFoundException } from '@core/exceptions/cache/cache-credential-not-found.exception'
import { CacheRepository } from '@shared/domain/cache-repository'
import { Logger } from '@shared/domain/logger'
import { StoreUserSchema } from '@shared/domain/store'

export class SwitchDatabaseUseCase {
  constructor(
    private readonly cacheRepository: CacheRepository,
    private readonly storeRepository: ForStoreRepositoryPort,
    private readonly logger: Logger,
  ) {}

  async execute(userId: number, newDatabase: string, currentCredentials: StoreUserSchema): Promise<StoreInfo & PermissionStore> {
    const cacheKey = `auth:credentials:${userId}`

    // conserva el TTL original de la sesión
    const remainingTtl = await this.cacheRepository.ttl(cacheKey)
    if (remainingTtl <= 0) throw new CacheCredentialNotFoundException(userId)

    const newCredentials: StoreUserSchema = { ...currentCredentials, database: newDatabase }

    // valida conexión a la nueva BD (lanza DatabaseError si falla)
    const details = await this.storeRepository.getDetails(newCredentials)
    const permissionStore = await this.storeRepository.getPermission(newCredentials)

    // actualiza las credenciales en cache con la nueva BD, conservando el TTL restante
    await this.cacheRepository.set(
      cacheKey,
      JSON.stringify({
        host: currentCredentials.host,
        database: details.name,
        user: currentCredentials.user,
        password: currentCredentials.password,
      }),
      remainingTtl,
    )

    this.logger.info(`[auth] Base de datos cambiada a '${details.name}'`)

    return { ...details, ...permissionStore }
  }
}
