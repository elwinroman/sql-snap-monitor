import { AuthenticatedUser, UserRole } from '@auth/domain/user'
import { ForStoreRepositoryPort } from '@auth/ports/drivens/for-store-repository.port'

// import { ForUserManagementPort } from '@auth/ports/drivens/for-user-management.port'
// import { generateUserHashId } from '@auth/utils/generate-user-hash-id.util'
import { LoginDto } from './login.dto'

export class LoginUseCase {
  constructor(
    // private readonly userManagement: ForUserManagementPort,
    private readonly storeRepository: ForStoreRepositoryPort,
  ) {}

  async execute(dto: LoginDto): Promise<AuthenticatedUser> {
    const details = await this.storeRepository.getDetails(dto)
    const permissionStore = await this.storeRepository.getPermission(dto)

    // const userHashId = await generateUserHashId({ hostname: details.server, username: dto.user })

    // const user = await this.userManagement.getUser(userHashId)

    const data = {
      id: '31h4j23hh3',
      user: 'aroman',
      role: 'admin' as UserRole,
      aliasServer: '10.5.5.2',
      storeDetails: { ...details, ...permissionStore },
    }
    return data
  }
}
