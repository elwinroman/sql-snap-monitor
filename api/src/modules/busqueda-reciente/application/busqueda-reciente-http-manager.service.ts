import { ForHttpManagingBusquedaRecientePort } from '@busqueda-reciente/domain/ports/drivers/for-http-managing-busqueda-reciente.port'

import { DeleteBusquedaRecienteUseCase } from './use-cases/delete-busqueda-reciente.use-case'

export class BusquedaRecienteHttpManagerService implements ForHttpManagingBusquedaRecientePort {
  constructor(private readonly deleteBusquedaRecienteUC: DeleteBusquedaRecienteUseCase) {}

  async deleteBusquedaReciente(id: number): Promise<string> {
    const status = await this.deleteBusquedaRecienteUC.execute(id)

    return status
  }

  // getAllBusquedaReciente(): Promise<void> {
  // code
  // }
}
