import { GetDatabaseInfoUseCase } from '@auth-users/aplication/get-database-info-use-case/get-database-info.use-case'
import { DatabaseInfo } from '@auth-users/domain/database-info'
import { PermissionDenyException } from '@auth-users/domain/exceptions/permission-deny.exception'
// import { CreateUserDto } from './create-user.dto'

export class LoginUserUseCase {
  constructor(
    private readonly getDatabaseInfoUseCase: GetDatabaseInfoUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByHashIdUseCase: FindUserByHashIdUseCase,
    // registerLogAccessUseCase: RegisterLogAccessUseCase,
  ) {}

  async run(userLogin: Credential): Promise<{ databaseInfo: DatabaseInfo }> {
    const databaseInfo = await this.getDatabaseInfoUseCase.execute()

    const userUniqueHashId = generateUserUniqueHashId({ server: databaseInfo.server, user: userLogin.user })
    let user = await this.findUserByHashIdUseCase.execute(userUniqueHashId)

    // registra usuario sql en la base de datos si no existe
    if (!user) {
      await this.createUserUseCase.execute()
      user = this.findUserByHashIdUseCase.execute(userUniqueHashId)
    }

    // deniega el acceso a un usuario sql DESACTIVADO en la BD
    if (user.active) throw PermissionDenyException

    // await this.registerLogAccessUseCase.execute()

    // const accessToken = generateAccessToken(user)
    // const refreshToken = generateRefreshToken()

    return { databaseInfo: { ...databaseInfo } }
  }
}
