import { PrimitiveUser } from '@users/domain/schemas'
import { User } from '@users/domain/user'

export interface ForRepoQuerying {
  create(user: User): Promise<PrimitiveUser | null>
  getById(id: number): Promise<PrimitiveUser | null>
  getByHashId(hashId: string): Promise<PrimitiveUser | null>
}
