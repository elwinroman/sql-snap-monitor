import { UserNotFoundException } from '@auth-users/domain/exceptions/user-not-found.exception'
import { PrimitiveUser } from '@auth-users/domain/user'
import { UserRepository } from '@auth-users/domain/user-repository'
import { logger } from '@shared/logger/infrastructure/pino-instance'

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(id: number): Promise<{ user: PrimitiveUser }> {
    const user = await this.userRepository.getById(id)
    if (!user) throw new UserNotFoundException(id)

    logger.info('Se ha obtenido correctamente el usuario', { context: `${GetUserByIdUseCase.name}.${this.run.name}` })

    // console.log('solo user')
    // console.log(user)

    // console.log('en el objeto USER')
    // console.log({ user: user.toValue() })
    return { user: user.toValue() }
  }
}
