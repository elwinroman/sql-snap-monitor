import crypto from 'node:crypto'

interface InputHashSchema {
  hostname: string
  username: string
}

/**
 * Genera un hash MD5 único basado en el `server` y el `username`.
 *
 * @param {InputHash} param - Objeto que contiene el nombre del servidor y el nombre de usuario.
 * @param {string} param.hostname - Nombre o identificador del host (no el alias).
 * @param {string} param.username - Nombre del usuario.
 *
 * @returns {string} El hash MD5 de 32 caracteres generado a partir de la concatenación de `server` y `username`.
 */
export function generateUserHashId({ hostname, username }: InputHashSchema) {
  return crypto
    .createHash('md5')
    .update(hostname + username, 'utf8')
    .digest('hex')
}
