import { PermissionStore, StoreInfo } from './store'

export interface AuthenticatedUser {
  id: number
  user: string
  // role: UserRole
  token: {
    accessToken: string
    // refreshToken: string
  }
  aliasHost: string
  storeDetails: StoreInfo & PermissionStore
}
