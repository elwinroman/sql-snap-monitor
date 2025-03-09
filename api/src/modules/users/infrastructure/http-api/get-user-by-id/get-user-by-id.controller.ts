import { Request, Response } from 'express'

import { GetUserByIdUseCase } from '../../../aplication/get-user-by-id-use-case/get-user-by-id.use-case'
import { UserNotFound } from '../../../domain/user-not-found'

export class GetUserByIdController {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  async run(req: Request, res: Response) {
    const { id } = req.params

    try {
      console.log('GetUserByIdController-> id es ', id)
      const user = await this.getUserByIdUseCase.run(id)
      console.log('GetUserByIdController -> return user ', user)
      return res.json(user)
    } catch (err) {
      if (err instanceof UserNotFound) return res.json(err)
      /*
      return res.status(404).json({
        correlationId: randomUUID(),
        error: {
          type: 'UserNotFound',
          title: 'Usuario no encontrado.',
          status: 404,
          detail: `El usuario con id ${id} no se ha encontrado en la base de datos.`,
          errorCode: 10001,
        },
      })
        */
      /*
      return res.status(500).json({
        correlationId: randomUUID(),
        error: {
          type: 'InternalServerError',
          title: 'Error interno en el sistema.',
          status: 500,
          detail: 'Ha ocurrido un error interno en el sistema, por favor, intente de nuevo.',
          errorCode: 10002,
        },
      })
      */
      /*
      return res.status(500).json({
        correlationId: req.correlationId,
        error: {
          type: 'ValidationError',
          title: 'Error de validación.',
          status: 400,
          detail: 'Los parámetros de la solicitud no se pudieron validar.',
          errorCode: 12002,
          invalidParams: [
            {
              name: 'age',
              reason: 'must be a positive integer',
            },
            {
              name: 'color',
              reason: "must be 'green', 'red' or 'blue'",
            },
          ],
        },
      })
        */
    }
  }
}
