import { DomainError } from '@shared/domain/domain-error'

export class BusquedaRecienteNotFoundException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(id: number) {
    super({ message: '[BUSQUEDA-RECIENTE] Busqueda reciente no encontrado' })
    this.title = 'Busqueda reciente no encontrado'
    this.detail = `La búsqueda reciente con id '${id}' no fue encontrado.`
  }
}
