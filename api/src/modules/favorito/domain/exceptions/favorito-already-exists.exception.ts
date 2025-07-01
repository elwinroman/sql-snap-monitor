import { Criteria } from '@favorito/domain/schemas/favorito'
import { DomainError } from '@shared/domain/domain-error'

export class FavoritoAlreadyExistsException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(criteria: Criteria) {
    super({ message: '[FAVORITO] Favorito ya existe' })
    this.title = 'Favorito ya existe'
    this.detail = `El favorito '${criteria.schema}.${criteria.objectName}' ya existe en '${criteria.database}' para el usuario '${criteria.idUser}'.`
  }
}
