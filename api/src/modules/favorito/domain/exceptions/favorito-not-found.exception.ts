import { DomainError } from '@shared/domain/domain-error'

export class FavoritoNotFoundException extends DomainError {
  readonly type = 'FavoritoNotFoundException'
  static readonly title = 'Favorito no encontrado'
  readonly detail: string
  static readonly metadata = { status: 404, errorCode: 4001 }

  constructor(id: number) {
    super(`[favorito] Favorito no encontrado: ${id}`)
    this.detail = `El favorito con id '${id}' no fue encontrado.`
  }
}
