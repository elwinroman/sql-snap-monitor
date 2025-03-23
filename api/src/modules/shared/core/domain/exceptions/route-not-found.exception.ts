import { DomainError } from '../domain-error'

export class RouteNotFoundException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: 'Error en la ruta.' })
    this.title = this.message
    this.detail = 'No se ha encontrado la ruta.'
  }
}
