import { ControlAuthenticatorService } from '@auth/application/authenticator.service'
import { LoginUseCase } from '@auth/application/use-cases/login/login.use-case'
import { JwtTokenManagerAdapter } from '@auth/infrastructure/adapters/drivens/jwt-token-manager.adapter'
import { MssqlStoreRepositoryAdapter } from '@auth/infrastructure/adapters/drivens/mssql-store-repository.adapter'
import { MssqlUserRepositoryAdapter } from '@auth/infrastructure/adapters/drivens/mssql-user-repository.adapter'
import { ValkeyCacheRepository } from '@shared/infrastructure/cache/valkey-cache-repository'

import { LoginController } from './login/login.controller'

/*****************************
 * Inyección de dependencias
 *****************************/

// Repositorios
const mssqlStoreRepositoty = new MssqlStoreRepositoryAdapter()
const mssqlUserRepository = new MssqlUserRepositoryAdapter()

const valkeyCacheRepository = new ValkeyCacheRepository()
const jwtTokenManager = new JwtTokenManagerAdapter()

// Caso de uso
const loginUseCase = new LoginUseCase(mssqlUserRepository, mssqlStoreRepositoty, valkeyCacheRepository, jwtTokenManager)
const controlAuthenticatorService = new ControlAuthenticatorService(loginUseCase)

// Controlador
export const loginController = new LoginController(controlAuthenticatorService)
