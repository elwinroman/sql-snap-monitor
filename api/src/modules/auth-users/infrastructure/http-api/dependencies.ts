// import { FindUserByHashIdUseCase } from '@auth-users/aplication/'
// import { CreateUserUseCase } from '@auth-users/aplication/create-user-use-case/create-user.use-case'
import { GetUserByIdUseCase } from '@auth-users/aplication/get-user-by-id-use-case/get-user-by-id.use-case'
import { LoginUserUseCase } from '@auth-users/aplication/login-user-use-case/login-user.use-case'
import { MSSQLDatabaseConnection } from '@shared/database/infrastructure/mssql/mssql-database-connection'

import { GetDatabaseInfoUseCase } from '../../aplication/get-database-info-use-case/get-database-info.use-case'
import { MSSQLDatabaseInfoRepository } from '../repositories/mssql-database-info-repository'
import { MSSQLUserRepository } from '../repositories/mssql-user-repository'
// import { CreateUserController } from './create-user/create-user-controller'
import { GetUserByIdController } from './get-user-by-id/get-user-by-id.controller'
import { TestController } from './test-controller'

/*****************************
 * Inyección de dependencias
 *****************************/

// repositorios
const mssqlDatabaseConnection = new MSSQLDatabaseConnection()
const userRepository = new MSSQLUserRepository(mssqlDatabaseConnection)

// Caso de uso - Obtener usuario por id
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository)
export const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

// Caso de uso - Login de usuario
const databaseInfoRepository = await MSSQLDatabaseInfoRepository.create()

const getDatabaseInfoUseCase = new GetDatabaseInfoUseCase(databaseInfoRepository)
// const createUserUseCase = new CreateUserUseCase(userRepository)
// const findUserByHashIdUseCase = new FindUserByHashIdUseCase()

// const loginUserUseCase = new LoginUserUseCase(getDatabaseInfoUseCase, createUserUseCase)
// Test controller
export const testController = new TestController(getDatabaseInfoUseCase)
