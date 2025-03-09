import { CreateUserUseCase } from '../../aplication/create-user-use-case/create-user.use-case'
import { GetUserByIdUseCase } from '../../aplication/get-user-by-id-use-case/get-user-by-id.use-case'
import { InMemoryUserRepository } from '../in-memory-user-repository'
import { CreateUserController } from './create-user/create-user-controller'
import { GetUserByIdController } from './get-user-by-id/get-user-by-id.controller'

// Repositorio
const userRepository = new InMemoryUserRepository()

// Use case - CreateUser
const createUserUseCase = new CreateUserUseCase(userRepository)
export const createUserController = new CreateUserController(createUserUseCase)

//Use case - GetUserById
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository)
export const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)
