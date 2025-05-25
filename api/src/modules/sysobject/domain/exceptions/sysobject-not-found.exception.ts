import { DomainError } from '@shared/domain/domain-error'

export class SysObjectNotFoundException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(id: number) {
    super({ message: 'Sysobjet no encontrado' })
    this.title = this.message
    this.detail = `No se ha encontrado el objeto sql con id: ${id}.`
  }
}
