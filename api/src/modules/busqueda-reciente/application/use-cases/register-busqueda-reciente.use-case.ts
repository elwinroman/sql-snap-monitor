import { ForBusquedaRecienteRepositoryPort } from '@busqueda-reciente/domain/ports/drivens/for-busqueda-reciente-repository.port'
import { BusquedaRecienteInput } from '@busqueda-reciente/domain/schemas/busqueda-reciente-input'

export class RegisterBusquedaRecienteUseCase {
  constructor(private readonly busquedaRecienteRepository: ForBusquedaRecienteRepositoryPort) {}
  async execute(busquedaRecienteInput: BusquedaRecienteInput): Promise<void> {
    const registeredBusquedaReciente = await this.busquedaRecienteRepository.createOrUpdate(busquedaRecienteInput)

    if (!registeredBusquedaReciente) throw new Error('Error al insertar o updatear una búsqueda reciente')
  }
}
