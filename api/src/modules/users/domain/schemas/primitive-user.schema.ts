/**
 * Representa un usuario en su forma primitiva.
 *
 * @typedef {Object} PrimitiveUser
 * @property {number} id - Identificador único numérico del usuario.
 * @property {string} hashId - Identificador en formato hash, sirve para buscar usuario SQL.
 * @property {string} user - Nombre de usuario.
 * @property {string} server - Nombre del servidor de origen al que pertenece el usuario.
 * @property {string} aliasServer - Alias o nombre alternativo del servidor (IP).
 * @property {Date} createdAt - Fecha de creación del usuario en el sistema.
 * @property {boolean} active - Indica si el usuario está activo (`true`) o inactivo (`false`).
 */
export interface PrimitiveUser {
  id?: number
  hashId: string
  user: string
  server: string
  aliasServer: string
  createdAt: Date
  active: boolean
}
