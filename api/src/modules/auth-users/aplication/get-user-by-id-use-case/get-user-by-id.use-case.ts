import { UserNotFoundException } from '@/modules/users/domain/exceptions/user-not-found.exception'
import { PrimitiveUser } from '@auth-users/domain/user'
import { logger } from '@shared/logger/infrastructure/pino-instance'

import { UserRepository } from '@/modules/auth-users/domain/user.repository'

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
