import { UserRepository } from "@/modules/auth-users/domain/user.repository";

export class FindUserByHashIdUseCase {
  constructor(private readonly userRepository: UserRepository)

  async execute(hashId: string): Promise<boolean> {
    const user = await this.userRepository.getById(hashId)

    return user
  }
}