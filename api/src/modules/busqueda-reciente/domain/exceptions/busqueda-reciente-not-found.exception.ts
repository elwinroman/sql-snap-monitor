import { DomainError } from '@shared/domain/domain-error'

export class BusquedaRecienteNotFoundException extends DomainError {
  readonly type = 'BusquedaRecienteNotFoundException'
  static readonly title = 'Búsqueda reciente no encontrada'
  readonly detail: string
  static readonly metadata = { status: 404, errorCode: 4000 }

  constructor(id: string) {
    super(`[busqueda-reciente] Búsqueda reciente no encontrada: ${id}`)
    this.detail = `La búsqueda reciente con id '${id}' no fue encontrada.`
  }
}
