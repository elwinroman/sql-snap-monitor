import { PermissionStore, StoreInfo } from '@auth/domain/schemas/store'
import { StoreUserSchema } from '@shared/domain/store'

export interface ForStoreRepositoryPort {
  getDetails(credential: StoreUserSchema): Promise<StoreInfo>
  getPermission(credential: StoreUserSchema): Promise<PermissionStore>
}
