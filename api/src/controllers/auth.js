import jwt from 'jsonwebtoken'

export class AuthController {
  constructor ({ authModel }) {
    this.authModel = authModel
  }

  login = async (req, res) => {
    const { server, dbname, username, password } = req.body
    const result = await this.authModel.login({ server, dbname, username, password })

    if (result.error) return res.status(401).json({ ok: false, error: res.error })

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' })

    return res.cookie('access_token', token, {
      httpOnly: true, // cookie solo accesible por el servidor
      secure: process.env.NODE_ENV === 'production', // cookie disponible solo en https
      sameSite: 'strict', // cookie no disponible para otros sitios
      maxAge: 1000 * 60 * 60 // cookie expira en 1 hora
    })
      .json({ ok: true, message: 'Sesión iniciada correctamente', token })
  }

  logout = async (req, res) => {
    return res.clearCookie('access_token').json({ ok: false, message: 'Sesión cerrada correctamente' })
  }
}
