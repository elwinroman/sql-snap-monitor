import { ApplicationError } from '@shared/application/application-error'

export class ForbiddenException extends ApplicationError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: '[AUTH] Acceso prohibido por falta de permisos' })
    this.title = 'Acceso prohibido'
    this.detail = 'Tu cuenta no tiene permisos suficientes para realizar esta acción o acceder a este recurso.'
  }
}
