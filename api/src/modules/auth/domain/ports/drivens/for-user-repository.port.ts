import { PrimitiveUser, RepoUser } from '@auth/domain/schemas/user'

export interface ForUserRepositoryPort {
  getOrCreate(user: PrimitiveUser): Promise<RepoUser | null>
  getById(id: number): Promise<RepoUser | null>
}
