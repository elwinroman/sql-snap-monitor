import { ForHttpManagingBusquedaRecientePort } from '@busqueda-reciente/domain/ports/drivers/for-http-managing-busqueda-reciente.port'
import { BusquedaRecienteFilter, BusquedaRecienteResponse, Context } from '@busqueda-reciente/domain/schemas/busqueda-reciente'
import { Meta } from '@shared/domain/schemas/meta'

import { GetAllBusquedasRecientesUseCase } from './use-cases'
import { DeleteBusquedaRecienteUseCase } from './use-cases/delete-busqueda-reciente.use-case'

export class BusquedaRecienteHttpManagerService implements ForHttpManagingBusquedaRecientePort {
  constructor(
    private readonly getAllBusquedasRecientesUC: GetAllBusquedasRecientesUseCase,
    private readonly deleteBusquedaRecienteUC: DeleteBusquedaRecienteUseCase,
  ) {}

  async getAllBusquedaReciente(filter: BusquedaRecienteFilter, limit: number): Promise<{ data: BusquedaRecienteResponse[]; meta: Meta }> {
    return this.getAllBusquedasRecientesUC.execute(filter, limit)
  }

  async deleteBusquedaReciente(id: string, context: Context): Promise<string> {
    return this.deleteBusquedaRecienteUC.execute(id, context)
  }
}
