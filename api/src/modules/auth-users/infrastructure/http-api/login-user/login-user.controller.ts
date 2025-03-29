import { LoginUserUseCase } from '@auth-users/aplication/login-user-use-case/login-user.use-case'
import { NextFunction, Request, Response } from 'express'

import { Credential } from '@/modules/shared/database/domain/credential'

import { LoginUserHttpDto, LoginUserSchema } from './login-user.http-dto'

export class LoginUserController {
  constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const { host, database, user, password } = req.body

    try {
      const validateData: LoginUserHttpDto = LoginUserSchema.parse({ host, database, user, password } as Credential)

      const loginUser = await this.loginUserUseCase.run(validateData)

      return res.json(loginUser)
    } catch (err) {
      // console.log(err)
      next(err)
    }
  }
}
