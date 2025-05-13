import { PermissionStore, StoreInfo } from '@auth/domain/schemas/store'
import { StoreUserSchema } from '@shared/domain/store'

export interface ForStoreRepositoryPort {
  getDetails(user: StoreUserSchema): Promise<StoreInfo>
  getPermission(user: StoreUserSchema): Promise<PermissionStore>
}
