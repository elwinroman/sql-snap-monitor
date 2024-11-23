import 'dotenv/config'

import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

import { COMMON_ERROR_CODES, VALIDATION_ERROR_MSG } from '@/constants'
import { AuthModel } from '@/models/auth'
import { LogModel } from '@/models/log'
import { Credentials, DatabaseDetails, MyCustomError } from '@/models/schemas'
import { UserModel } from '@/models/user'
import { encryptString, generateHashForUniqueUID } from '@/utils'

export class AuthController {
  // Login para un usuario SQL
  login = async (req: Request, res: Response, next: NextFunction) => {
    const { server, dbname, username, password }: Credentials = req.body

    // Validación
    try {
      const LoginSchema = z.object({
        server: z
          .string({ required_error: VALIDATION_ERROR_MSG.REQUIRED })
          .trim()
          .max(64, { message: VALIDATION_ERROR_MSG.MAX })
          .min(1, { message: VALIDATION_ERROR_MSG.NOEMPTY }),
        dbname: z
          .string({ required_error: VALIDATION_ERROR_MSG.REQUIRED })
          .trim()
          .max(64, { message: VALIDATION_ERROR_MSG.MAX })
          .min(1, { message: VALIDATION_ERROR_MSG.NOEMPTY }),
        username: z
          .string({ required_error: VALIDATION_ERROR_MSG.REQUIRED })
          .trim()
          .max(64, { message: VALIDATION_ERROR_MSG.MAX })
          .min(1, { message: VALIDATION_ERROR_MSG.NOEMPTY }),
        password: z.string({ required_error: VALIDATION_ERROR_MSG.REQUIRED }).trim().max(64, { message: VALIDATION_ERROR_MSG.MAX }),
      })

      LoginSchema.parse({ server, dbname, username, password })
    } catch (err) {
      return next(err)
    }

    // Funcionalidad
    try {
      // sanitizar los datos
      const credentials = {
        server: server.trim(),
        dbname: dbname.trim(),
        username: username.trim().toLowerCase(),
        password: encryptString(password.trim()),
      }

      const authModel = new AuthModel(credentials)
      const databaseDetails = (await authModel.login()) as DatabaseDetails

      // buscar el usuario
      const usernameHash = generateHashForUniqueUID({ server: databaseDetails.server, username: credentials.username })
      const userModel = new UserModel()
      let user = await userModel.findUserByUsername(usernameHash)

      // si no se encuentra el usuario en la BD de logs, se procede a registrar uno nuevo
      if (!user) {
        await userModel.registerUser({
          cHashUsuarioUID: usernameHash,
          cUsuario: credentials.username,
          cServer: databaseDetails.server,
          cAliasServer: databaseDetails.server,
        })

        user = await userModel.findUserByUsername(usernameHash)
      }

      // denegar acceso a la aplicación a un usuario desactivado
      if (!user?.lVigente) return next(new MyCustomError(COMMON_ERROR_CODES.PERMISSION_REQUIRED))

      // generar token con los datos del usuario
      const userDataForToken = user
      const token = jwt.sign({ ...userDataForToken }, process.env.JWT_SECRET as string, { expiresIn: '48h' })

      // almacenar las credenciales en la sesión para reutilizarlas (todo: usar redis o mongo-db en el futuro)
      req.session.credentials = { ...credentials }

      return res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true, // cookie solo accesible por el servidor
          // secure: process.env.NODE_ENV === 'production', // cookie disponible solo en https
          secure: false,
          sameSite: 'strict', // cookie no disponible para otros sitios
          maxAge: 1000 * 60 * 60 * 48, // cookie expira en 1 hora
        })
        .json({ status: 'success', statusCode: 200, message: 'Autenticación correcta', data: databaseDetails })
    } catch (err) {
      next(err)
    }
  }

  // Cerrar sesión
  logout = async (req: Request, res: Response, next: NextFunction) => {
    const { isSessionActive } = req.session

    if (!isSessionActive) return next(new MyCustomError(COMMON_ERROR_CODES.SESSIONALREADYCLOSED))

    try {
      return res
        .clearCookie('access_token')
        .status(200)
        .json({ status: 'success', statusCode: 200, message: 'Sesión cerrada correctamente' })
    } catch (err) {
      next(err)
    }
  }

  // Comprobar si la sesión está activa (por cookie y/o conexión a BD)
  checkSession = async (req: Request, res: Response, next: NextFunction) => {
    const { credentials, isSessionActive } = req.session

    if (!isSessionActive) return next(new MyCustomError(COMMON_ERROR_CODES.SESSIONALREADYCLOSED))

    try {
      const authModel = await new AuthModel(credentials as Credentials)
      const result = await authModel.checkLogin()

      return res.status(200).json({ status: 'success', statusCode: 200, message: 'Sesión activa', time: result })
    } catch (err) {
      // si se ha cambiado el password sql del usuario
      res.clearCookie('access_token')
      next(err)
    }
  }
}
