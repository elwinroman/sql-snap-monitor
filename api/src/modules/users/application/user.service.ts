import { User } from '@users/domain/user'
import { ForRepoQuerying } from '@users/ports/drivens/for-repo-querying'
import { ForManagingUser } from '@users/ports/drivers/for-managing-user'

import { ExternalUser, PrimitiveUser, ResponseUser } from '../domain/schemas'

export class UserService implements ForManagingUser {
  constructor(private readonly repository: ForRepoQuerying) {}

  async createUser(user: ExternalUser): Promise<PrimitiveUser> {
    const pUser = User.create(user)

    const newUser = await this.repository.create(pUser)

    if (!newUser) throw new Error('Error al crear')
  }

  async getUser(id: number): Promise<ResponseUser | null> {}
}
