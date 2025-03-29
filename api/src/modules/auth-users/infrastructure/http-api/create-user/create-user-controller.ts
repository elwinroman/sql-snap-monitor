import { Request, Response } from 'express'

import { CreateUserUseCase } from '../../../aplication/create-user-use-case/create-user.use-case'

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async run(req: Request, res: Response) {
    await this.createUserUseCase.run({
      hashUsernameUID: req.body.hashUsernameUID,
      user: req.body.user,
      server: req.body.server,
      aliasServer: req.body.aliasServer,
    })
    res.status(200).send('user created sucessfully')
  }
}
