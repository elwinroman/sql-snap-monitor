import { MssqlStoreRepositoryAdapter } from '@auth/adapters/drivens/mssql-store-repository.adapter'
import { ControlAuthenticatorService } from '@auth/application/authenticator.service'
import { LoginUseCase } from '@auth/application/use-cases/login/login.use-case'

import { LoginController } from './login/login.controller'

/*****************************
 * Inyección de dependencias
 *****************************/
const mssqlStoreRepositoty = new MssqlStoreRepositoryAdapter()
const loginUseCase = new LoginUseCase(mssqlStoreRepositoty)
const controlAuthenticatorService = new ControlAuthenticatorService(loginUseCase)

export const loginController = new LoginController(controlAuthenticatorService)
