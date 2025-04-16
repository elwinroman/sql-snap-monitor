import { StoreInfo } from '@/modules/auth/ports/drivens/for-store-repository-provider'
import { ExternalUser, ResponseUser } from '@/modules/users/domain/schemas'

export interface Status {
  date: Date
  viewDefinitionPermision: boolean
}

export interface AuthenticatedUser {
  userInfo: ResponseUser
  storeRepoInfo: StoreInfo
}

export interface ForAuthenticating {
  login(user: ExternalUser): Promise<AuthenticatedUser>
  logout(): Promise<void>
  health(): Promise<Status>
}
