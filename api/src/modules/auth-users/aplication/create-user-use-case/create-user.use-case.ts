import { PrimitiveUser } from '@auth-users/domain/user'
import { User } from '@auth-users/domain/user'

import { UserRepository } from '@/modules/auth-users/domain/user.repository'

import { CreateUserDto } from './create-user.dto'

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(dto: CreateUserDto): Promise<{ user: PrimitiveUser }> {
    const user = User.create(dto)

    await this.userRepository.create(user)

    return {
      user: user.toValue(),
    }
  }
}
