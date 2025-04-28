import { PermissionStoreSchema, StoreInfoSchema } from '@auth/domain/store'
import { StoreUserSchema } from '@shared/domain/store'

export interface ForStoreRepositoryPort {
  getDetails(user: StoreUserSchema): Promise<StoreInfoSchema>
  getPermission(user: StoreUserSchema): Promise<PermissionStoreSchema>
}
