import { DomainError } from '@shared/domain/domain-error'

export class ProdSysObjectNotFoundException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(name: string, schema: string) {
    super({ message: '[SYSOBJECT] Objeto de sistema no encontrado' })
    this.title = 'Objeto no encontrado'
    this.detail = `No se ha encontrado el objeto '${schema}.${name}}' en pre-producción.`
  }
}
