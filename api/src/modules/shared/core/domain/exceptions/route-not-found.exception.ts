import { DomainError } from '../domain-error'

export class RouteNotFoundException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: 'Ruta no encontrada.' })
    this.title = this.message
    this.detail = 'La ruta que intentó acceder no está disponible en el servidor. Por favor, verifique la URL y vuelva a intentarlo.'
  }
}
