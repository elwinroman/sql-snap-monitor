import { ExternalUser, PrimitiveUser, ResponseUser } from '@users/domain/schemas'

export interface ForManagingUser {
  createUser(user: ExternalUser): Promise<PrimitiveUser>
  getUser(id: number): Promise<ResponseUser | null>
}
