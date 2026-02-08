import { Criteria } from '@favorito/domain/schemas/favorito'
import { DomainError } from '@shared/domain/domain-error'

export class FavoritoAlreadyExistsException extends DomainError {
  readonly type = 'FavoritoAlreadyExistsException'
  static readonly title = 'Favorito ya existe'
  readonly detail: string
  static readonly metadata = { status: 409, errorCode: 4002 }

  constructor(criteria: Criteria) {
    super(`[favorito] Favorito ya existe: ${criteria.schema}.${criteria.objectName}`)
    this.detail = `El favorito '${criteria.schema}.${criteria.objectName}' ya existe para el usuario '${criteria.idUser}'.`
  }
}
