import { DomainError } from '@shared/domain/domain-error'

export class FavoritoNotFoundException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(id: number) {
    super({ message: '[FAVORITO] Favorito no encontrado' })
    this.title = 'Favorito no encontrado'
    this.detail = `El favorito con id '${id}' no fue encontrado.`
  }
}
