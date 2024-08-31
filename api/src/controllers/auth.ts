import { AUTH_ERROR_CODES } from '../constants/error-codes'
import { getError } from '../utils/get-error.util'
import { isLoggedIn } from '../utils/verify-session.util'
import jwt from 'jsonwebtoken'

export class AuthController {
  private authModel: any
  
  constructor ({ authModel }) {
    this.authModel = authModel
  }

  login = async (req, res) => {
    const { server, dbname, username, password } = req.body
    const credentials = { server, dbname, username, password }

    try {
      const result = await this.authModel.login({ credentials })
      if (result.error) return res.status(result.statusCode).json(result)

      const token = await jwt.sign({ credentials }, process.env.JWT_SECRET, { expiresIn: '48h' })

      return res.cookie('access_token', token, {
        httpOnly: true, // cookie solo accesible por el servidor
        secure: process.env.NODE_ENV === 'production', // cookie disponible solo en https
        sameSite: 'strict', // cookie no disponible para otros sitios
        maxAge: 1000 * 60 * 60 * 48// cookie expira en 1 hora
      }).json({ status: 'success', statusCode: 200, message: 'Autenticación correcta', token })
    } catch (err) {
      const error = getError({ err })
      return res.status(error.statusCode).json(error)
    }
  }

  logout = async (req, res) => {
    return res.clearCookie('access_token').status(200).json(
      { status: 'success', statusCode: 200, message: 'Sesión cerrada correctamente' }
    )
  }

  checkSession = async (req, res) => {
    const { credentials } = req.session

    if (!isLoggedIn(credentials)) {
      const { statusCode } = AUTH_ERROR_CODES.TOKEN_INVALID
      return res.status(statusCode).json(AUTH_ERROR_CODES.TOKEN_INVALID)
    }

    return res.json({ status: 'success', statusCode: 200, message: 'Sesión activa' })
  }
}
