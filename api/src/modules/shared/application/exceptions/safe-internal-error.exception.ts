import { ApplicationError } from '../application-error'

/**
 * Error interno "seguro" para exponer al cliente.
 *
 * Usar cuando se quiere ocultar detalles técnicos de errores
 * de infraestructura o errores no controlados.
 *
 * El middleware automáticamente convierte errores de infraestructura
 * y errores desconocidos a esta excepción.
 */
export class SafeInternalServerErrorException extends ApplicationError {
  readonly type = 'SafeInternalServerErrorException'
  static readonly title = 'Error interno del sistema'
  readonly detail: string
  static readonly metadata = { status: 500, errorCode: 1003 }

  constructor(detail = 'No pudimos completar la operación. Por favor, contacta con el administrador.') {
    super('[internal] Error interno encapsulado')
    this.detail = detail
  }
}
