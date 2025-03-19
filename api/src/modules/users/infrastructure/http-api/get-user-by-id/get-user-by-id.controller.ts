import { NextFunction, Request, Response } from 'express'

import { GetUserByIdUseCase } from '../../../aplication/get-user-by-id-use-case/get-user-by-id.use-case'
import { GetUserByIdHttpDto, GetUserByIdSchema } from './get-user-by-id.http-dto'

export class GetUserByIdController {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      const validateData: GetUserByIdHttpDto = GetUserByIdSchema.parse({ id })

      const user = await this.getUserByIdUseCase.run(validateData.id)

      return res.json(user)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}
