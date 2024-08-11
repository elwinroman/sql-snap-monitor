import jwt from 'jsonwebtoken'

/**
 * Verifica el token de acceso, y almacena el usuario en la sesión
 * (si no existe el token, la sesión se mantiene en null)
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export function verifyToken (req, res, next) {
  const token = req.cookies.access_token
  req.session = { credentials: null } // no existe usuario por defecto

  try {
    const { credentials } = jwt.verify(token, process.env.JWT_SECRET)
    req.session.credentials = credentials // se guarda el usuario en la sesión
  } catch {
    // error al verificar el token, las rutas protegidas se gestionan en sus controladores
    req.session.credentials = null
  }
  next()
}
