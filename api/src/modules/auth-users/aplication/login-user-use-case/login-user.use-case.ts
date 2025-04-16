import { CreateUserUseCase } from '@auth-users/aplication/create-user-use-case/create-user.use-case'
import { FindUserByHashIdUseCase } from '@auth-users/aplication/find-user-by-hash-id-use-case/find-user-by-hash-id.use-case'
import { GetDatabaseInfoUseCase } from '@auth-users/aplication/get-database-info-use-case/get-database-info.use-case'
import { DatabaseInfo } from '@auth-users/domain/database-info'
import { PermissionDenyException } from '@/modules/users/domain/exceptions/permission-deny.exception'
import { generateUserHashId } from '@auth-users/infrastructure/utils/generate-user-hash-id.util'
import { Credential } from '@shared/database/domain/credential'

export class LoginUserUseCase {
  constructor(
    private readonly getDatabaseInfoUseCase: GetDatabaseInfoUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByHashIdUseCase: FindUserByHashIdUseCase,
    // registerLogAccessUseCase: RegisterLogAccessUseCase,
  ) {}

  async run(userLogin: Credential): Promise<{ databaseInfo: DatabaseInfo }> {
    const databaseInfo = await this.getDatabaseInfoUseCase.execute()

    return { databaseInfo }
    // const userUniqueHashId = generateUserHashId({ username: userLogin.user, server: databaseInfo. })
    // let user = await this.findUserByHashIdUseCase.execute(userUniqueHashId)

    // // registra usuario sql en la base de datos si no existe
    // if (!user) {
    //   await this.createUserUseCase.execute()
    //   user = this.findUserByHashIdUseCase.execute(userUniqueHashId)
    // }

    // // deniega el acceso a un usuario sql DESACTIVADO en la BD
    // if (user.active) throw PermissionDenyException

    // // await this.registerLogAccessUseCase.execute()

    // // const accessToken = generateAccessToken(user)
    // // const refreshToken = generateRefreshToken()

    // return { databaseInfo: { ...databaseInfo } }
  }
}
