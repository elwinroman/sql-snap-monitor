import { CreateUserUseCase } from '@auth-users/aplication/create-user-use-case/create-user.use-case'
import { GetUserByIdUseCase } from '@auth-users/aplication/get-user-by-id-use-case/get-user-by-id.use-case'
// import { connection } from '@/modules/shared/repository/connection'
import { MSSQLDatabaseConnection } from '@shared/database/infrastructure/mssql/mssql-database-connection'

// import { LoginUserUseCase } from '@auth-users/aplication/login-user-use-case/login-user.use-case'
import { MSSQLDatabaseInfoRepository } from '../repositories/mssql-database-info-repository'
import { MSSQLUserRepository } from '../repositories/mssql-user-repository'
import { CreateUserController } from './create-user/create-user-controller'
import { GetUserByIdController } from './get-user-by-id/get-user-by-id.controller'

/*****************************
 * Inyección de dependencias
 *****************************/

// repositorios
const mssqlDatabaseConnection = new MSSQLDatabaseConnection()
const userRepository = new MSSQLUserRepository(mssqlDatabaseConnection)
// const databaseInfoRepository = new MSSQLDatabaseInfoRepository()

// Caso de uso - Crear usuario
const createUserUseCase = new CreateUserUseCase(userRepository)
export const createUserController = new CreateUserController(createUserUseCase)

// Caso de uso - Obtener usuario por id
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository)
export const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

// Caso de uso - Login de usuario
// const loginUserUseCase = new LoginUserUseCase(databaseInfoRepository)
