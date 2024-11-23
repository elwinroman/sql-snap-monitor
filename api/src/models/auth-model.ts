import { CustomError } from './custom-error-model'

/**
 * @typedef {Object} DatabaseInfo - Información de la base de datos.
 * @property {string} name - Nombre de la base de datos.
 * @property {number} compatibility - Nivel de compatibilidad de la base de datos.
 * @property {string | null} description - Descripción de la base de datos. Puede ser nulo si no está disponible.
 * @property {string} server - Nombre del servidor que aloja la base de datos.
 * @property {number} has_perms - Indica si el usuario tiene permisos de `SELECT` sobre las tablas del sistema de la base de datos actual.
 *   - **1**: El usuario tiene permisos para ejecutar consultas `SELECT` sobre las tablas del sistema.
 *   - **0**: El usuario no tiene permisos para ejecutar consultas `SELECT` sobre las tablas del sistema.
 */
export interface DatabaseDetails {
  name: string
  compatibility: number
  description: string | null
  server: string
}

export interface ForAuthenticating {
  login(): Promise<DatabaseDetails | undefined>
  checkLogin(): Promise<string | CustomError | undefined>
}
