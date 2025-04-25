import { DomainError } from '@shared/domain/domain-error'

export class DatabaseRequestErrorException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(code: string, message: string) {
    super({ message: 'Error en la consulta.' })
    this.title = this.message
    this.detail = `Hubo un error relacionado con la ejecución de consultas y procedimientos almacenados. ${code} - ${message}`
  }
}
