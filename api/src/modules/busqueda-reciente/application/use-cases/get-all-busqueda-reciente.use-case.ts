import { ForBusquedaRecienteRepositoryPort } from '@busqueda-reciente/domain/ports/drivens/for-busqueda-reciente-repository.port'
import { ForSysObjectRepositoryPort } from '@busqueda-reciente/domain/ports/drivens/for-sysobject-repository.port'
import { BusquedaRecienteFilter, BusquedaRecienteResponse } from '@busqueda-reciente/domain/schemas/busqueda-reciente'
import { Meta } from '@shared/domain/schemas/meta'
import { parseSqlObjectTypeCondition } from '@shared/infrastructure/utils'

export class GetAllBusquedasRecientesUseCase {
  constructor(
    private readonly repository: ForBusquedaRecienteRepositoryPort,
    private readonly sysobjectRepository: ForSysObjectRepositoryPort,
  ) {}

  async execute(filter: BusquedaRecienteFilter, limit: number): Promise<{ data: BusquedaRecienteResponse[]; meta: Meta }> {
    const typeFormatCondition = parseSqlObjectTypeCondition(filter.type) // formatea el tipo de objeto para inyetarse en sql
    const filterFormated = { ...filter, type: typeFormatCondition }
    const { data, meta } = await this.repository.findMany(filterFormated, limit)

    // si no existes registros enviar el array vacio
    if (data.length === 0) return { data: [], meta }

    // extrae el schema y el nombre del objeto para la recuperacion de IDs e inyectar los IDs de los objetos en el response
    const objects = data.map(row => ({ schema: row.schema, name: row.objectName }))
    const objectIds = await this.sysobjectRepository.findIDsByNameAndSchema(objects)
    const newData = data.map((row, index) => ({
      ...row,
      objectId: objectIds[index],
    }))

    return { data: newData, meta }
  }
}
