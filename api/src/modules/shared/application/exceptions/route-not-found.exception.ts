import { ApplicationError } from '@shared/application/application-error'

export class RouteNotFoundException extends ApplicationError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: '[ROUTE] Ruta no encontrada' })
    this.title = 'Ruta no encontrada'
    this.detail =
      'La dirección solicitada no existe o no está disponible en este momento. Verifica que la URL sea correcta e inténtalo nuevamente.'
  }
}
