import { PermissionStoreSchema, StoreInfoSchema } from './store'

export type UserRole = 'admin' | 'viewer' | 'audit'

export interface AuthenticatedUser {
  id: string
  user: string
  role: UserRole
  storeDetails: StoreInfoSchema & PermissionStoreSchema
  aliasServer: string
}
