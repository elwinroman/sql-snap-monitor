import { User } from './user'

export interface UserRepository {
  create(user: User): Promise<void>
  getById(id: number): Promise<User | null>
  findByHashId(hashId: string): Promise<boolean>
}
