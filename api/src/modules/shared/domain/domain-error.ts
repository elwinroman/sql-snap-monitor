import { BaseError } from '@core/exceptions/base-error'

/**
 * Clase base abstracta para errores de la capa de DOMINIO.
 *
 * Usar para errores relacionados con reglas de negocio:
 * - Validaciones de entidades/value objects
 * - Invariantes del dominio violadas
 * - Recursos no encontrados
 * - Conflictos de estado
 *
 * @example
 * ```typescript
 * export class InvalidCredentialsException extends DomainError {
 *   readonly type = 'InvalidCredentialsException'
 *   readonly title = 'Credenciales inválidas'
 *   readonly detail = 'Usuario o contraseña incorrectos'
 *   readonly metadata = { status: 401, errorCode: 2000 }
 *
 *   constructor() {
 *     super('[auth] Credenciales inválidas')
 *   }
 * }
 * ```
 */
export abstract class DomainError extends BaseError {}
