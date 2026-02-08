import { BaseError } from '@core/exceptions/base-error'

/**
 * Clase base abstracta para errores de la capa de APLICACIÓN.
 *
 * Usar para errores relacionados con orquestación y validación de casos de uso:
 * - Validación de inputs (DTOs, request params)
 * - Errores de autenticación/autorización
 * - Errores de flujo de aplicación
 * - Precondiciones no cumplidas
 *
 * @example
 * ```typescript
 * export class ValidationException extends ApplicationError {
 *   readonly type = 'ValidationException'
 *   readonly title = 'Error de validación'
 *   readonly detail: string
 *   readonly metadata = { status: 422, errorCode: 1000 }
 *
 *   constructor(detail: string) {
 *     super('[validation] Parámetros inválidos')
 *     this.detail = detail
 *   }
 * }
 * ```
 */
export abstract class ApplicationError extends BaseError {}
