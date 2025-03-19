import { DomainError } from '../../../shared/domain/exceptions/domain-error'

export class UserNotFoundException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(id: number) {
    super({ message: 'Usuario no encontrado' })
    this.title = this.message
    this.detail = `El usuario con id ${id} no se ha encontrado en la base de datos.`
  }
}
