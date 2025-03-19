import { User } from './user'

export interface UserRepository {
  create(user: User): Promise<void>
  // getAll(): Promise<>
  getById(id: number): Promise<User | null>
}
