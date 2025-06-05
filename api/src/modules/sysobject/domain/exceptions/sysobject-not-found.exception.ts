import { DomainError } from '@shared/domain/domain-error'

export class SysObjectNotFoundException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(id: number) {
    super({ message: '[SYSOBJECT] Objeto de sistema no encontrado' })
    this.title = 'Objeto no encontrado'
    this.detail = `No se ha encontrado el objeto sql con id: ${id}.`
  }
}
