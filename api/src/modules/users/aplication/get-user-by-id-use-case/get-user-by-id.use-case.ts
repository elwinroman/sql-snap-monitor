import { UserNotFoundException } from '../../domain/exceptions/user-not-found'
import { PrimitiveUser } from '../../domain/user'
import { UserRepository } from '../../domain/user-repository'

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(id: string): Promise<{ user: PrimitiveUser }> {
    console.log('GetUserByIdUseCase -> id es ', id)
    const user = await this.userRepository.getById(id)
    if (!user) throw new UserNotFoundException(id)

    return { user: user.toValue() }
  }
}
