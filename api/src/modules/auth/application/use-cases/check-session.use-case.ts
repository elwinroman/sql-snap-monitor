import { ForStoreRepositoryPort } from '@auth/domain/ports/drivens'
import { StoreInfo } from '@auth/domain/schemas/store'
import { StoreUserSchema } from '@shared/domain/store'

export class CheckSessionUseCase {
  constructor(private readonly storeRepository: ForStoreRepositoryPort) {}

  async execute(credentials: StoreUserSchema): Promise<StoreInfo> {
    const storeDetails = await this.storeRepository.getDetails(credentials)

    return { ...storeDetails }
  }
}
