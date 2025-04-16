import { ExternalUser, PrimitiveUser } from '@users/domain/schemas'

export interface ForUserManagementProvider {
  createUser(user: ExternalUser): Promise<PrimitiveUser>
  getUser(id: string): Promise<PrimitiveUser>
}
