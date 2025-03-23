import { DomainError } from '../domain-error'

export class DatabaseGenericException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: 'Error genérico en la consulta.' })
    this.title = this.message
    this.detail = 'Ha ocurrido un error en la base de datos, para más información, consulte el error original.'
  }
}
