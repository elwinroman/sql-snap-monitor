import { DomainError } from '@shared/core/domain/domain-error'

export class PermissionDenyException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: 'Permiso denegado.' })
    this.title = this.message
    this.detail = 'El acceso al sistema ha sido denegado. Si consideras que esto es un error, por favor contacta con el administrador.'
  }
}
