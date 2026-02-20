import { BusquedaRecienteNotFoundException } from '@busqueda-reciente/domain/exceptions/busqueda-reciente-not-found.exception'
import { ForBusquedaRecienteRepositoryPort } from '@busqueda-reciente/domain/ports/drivens/for-busqueda-reciente-repository.port'
import { Context } from '@busqueda-reciente/domain/schemas/busqueda-reciente'

export class DeleteBusquedaRecienteUseCase {
  constructor(private readonly repository: ForBusquedaRecienteRepositoryPort) {}

  async execute(id: string, context: Context): Promise<string> {
    const busquedaReciente = await this.repository.getById(id, context)

    if (!busquedaReciente || !busquedaReciente.isActive) throw new BusquedaRecienteNotFoundException(id)

    if (busquedaReciente.idUser !== context.idUser || busquedaReciente.database.toLowerCase() !== context.database.toLowerCase())
      throw new BusquedaRecienteNotFoundException(id)

    const deleteAction = await this.repository.deleteById(id)
    if (!deleteAction) throw new Error(`Ha ocurrido un error inesperado en la eliminación de la búsqueda reciente con id '${id}'`)

    return `Se ha eliminado correctamente la búsqueda reciente con id '${id}'.`
  }
}
