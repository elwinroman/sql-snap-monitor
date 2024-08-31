/**
 * Verifica si el usuario está autenticado
 *
 * @param {Object} credentials - Credenciales del usuario
 * @returns {Boolean} - Indica si el usuario está autenticado
 */

export function isLoggedIn(credentials) {
  // return credential ? true : false
  return !!credentials
}
