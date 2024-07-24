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
  req.session = { user: null } // no existe usuario por defecto

  try {
    const { username } = jwt.verify(token, process.env.JWT_SECRET)
    req.session.user = username // se guarda el usuario en la sesión
  } catch {} // error al verificar el token, necesita pasar para consultar los objetos de producción
  next()
}
