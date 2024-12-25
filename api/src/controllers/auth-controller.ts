import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

import { JWT_SECRET } from '@/config/enviroment'
import { COMMON_ERROR_CODES, VALIDATION_ERROR } from '@/constants'
import { Credentials, DatabaseDetails, MyCustomError } from '@/models'
import { AuthService, LogService, UserService } from '@/services'
import { encryptString, generateHashForUniqueUID } from '@/utils'

export class AuthController {
  // Login para un usuario SQL
  login = async (req: Request, res: Response, next: NextFunction) => {
    const { server, dbname, username, password }: Credentials = req.body

    // Validación
    try {
      const LoginSchema = z.object({
        server: z
          .string({ required_error: VALIDATION_ERROR.required })
          .trim()
          .max(64, { message: VALIDATION_ERROR.max })
          .min(1, { message: VALIDATION_ERROR.noempty }),
        dbname: z
          .string({ required_error: VALIDATION_ERROR.required })
          .trim()
          .max(64, { message: VALIDATION_ERROR.max })
          .min(1, { message: VALIDATION_ERROR.noempty }),
        username: z
          .string({ required_error: VALIDATION_ERROR.required })
          .trim()
          .max(64, { message: VALIDATION_ERROR.max })
          .min(1, { message: VALIDATION_ERROR.noempty }),
        password: z.string({ required_error: VALIDATION_ERROR.required }).trim().max(64, { message: VALIDATION_ERROR.max }),
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

      const authService = new AuthService(credentials)
      const databaseDetails = (await authService.login()) as DatabaseDetails

      // buscar el usuario
      const usernameHash = generateHashForUniqueUID({ server: databaseDetails.server, username: credentials.username })
      const userService = new UserService()
      let user = await userService.buscarUsuarioByUsername(usernameHash)

      // si no se encuentra el usuario en la BD de logs, se procede a registrar uno nuevo
      if (!user) {
        await userService.registrarUsuario({
          cHashUsuarioUID: usernameHash,
          cUsuario: credentials.username,
          cServer: databaseDetails.server,
          cAliasServer: server,
        })

        user = await userService.buscarUsuarioByUsername(usernameHash)
      }

      // denegar acceso a la aplicación a un usuario desactivado
      if (!user?.lVigente) return next(new MyCustomError(COMMON_ERROR_CODES.permission_required))

      // registrar el acceso del usuario en el log
      const logService = new LogService()
      await logService.registrarAcceso({
        idUsuario: user.idUsuario,
        cDatabase: databaseDetails.name,
      })

      // generar token con los datos del usuario
      const userDataForToken = user
      const token = jwt.sign({ ...userDataForToken }, JWT_SECRET, { expiresIn: '48h' })

      // almacenar las credenciales en la sesión para reutilizarlas (todo: usar redis o mongo-db en el futuro)
      req.session.credentials = {
        server: server,
        dbname: databaseDetails.name,
        username: credentials.username,
        password: credentials.password,
      }

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

    if (!isSessionActive) return next(new MyCustomError(COMMON_ERROR_CODES.sessionalreadyclosed))

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

    if (!isSessionActive) return next(new MyCustomError(COMMON_ERROR_CODES.sessionalreadyclosed))

    try {
      const authService = new AuthService(credentials)
      const result = await authService.checkLogin()
      return res.status(200).json({ status: 'success', statusCode: 200, message: 'Sesión activa', data: { ...result } })
    } catch (err) {
      // si se ha cambiado el password sql del usuario
      res.clearCookie('access_token')
      next(err)
    }
  }
}
