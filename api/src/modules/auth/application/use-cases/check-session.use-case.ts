import { ForStoreRepositoryPort } from '@auth/domain/ports/drivens'
import { StoreInfo } from '@auth/domain/schemas/store'
import { CacheRepository } from '@shared/domain/cache-repository'
import { StoreUserSchema } from '@shared/domain/store'

export class CheckSessionUseCase {
  constructor(
    private readonly storeRepository: ForStoreRepositoryPort,
    private readonly cacheRepository: CacheRepository,
  ) {}

  async execute(id: number): Promise<StoreInfo> {
    const userCacheCredentials = await this.cacheRepository.get(`auth:credentials:${id}`)
    if (!userCacheCredentials) throw new Error('Las credenciales no se encontraron en la caché')

    const userCredentials: StoreUserSchema = JSON.parse(userCacheCredentials)
    const storeDetails = await this.storeRepository.getDetails(userCredentials)

    return { ...storeDetails }
  }
}
