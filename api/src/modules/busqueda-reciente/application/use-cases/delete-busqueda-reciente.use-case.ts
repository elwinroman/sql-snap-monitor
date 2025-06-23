import { BusquedaRecienteNotFoundException } from '@busqueda-reciente/domain/exceptions/busqueda-reciente-not-found.exception'
import { ForBusquedaRecienteRepositoryPort } from '@busqueda-reciente/domain/ports/drivens/for-busqueda-reciente-repository.port'

export class DeleteBusquedaRecienteUseCase {
  constructor(private readonly busquedaRecienteRepository: ForBusquedaRecienteRepositoryPort) {}

  async execute(id: number): Promise<string> {
    const deleteBR = await this.busquedaRecienteRepository.deleteById(id)

    if (!deleteBR) throw new BusquedaRecienteNotFoundException(id)

    return `Se ha eliminado correctamente la búsqueda reciente con id '${id}'.`
  }
}
