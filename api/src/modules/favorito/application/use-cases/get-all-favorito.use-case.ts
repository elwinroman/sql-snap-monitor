import { ForFavoritoRepositoryPort } from '@favorito/domain/ports/drivens/for-favorito-repository.port'
import { ForSysObjectRepositoryPort } from '@favorito/domain/ports/drivens/for-sysobject-repository.port'
import { FavoritoFilter, FavoritoResponse } from '@favorito/domain/schemas/favorito'
import { Meta } from '@shared/domain/schemas/meta'
import { parseSqlObjectTypeCondition } from '@shared/infrastructure/utils'

export class GetAllFavoritosUseCase {
  constructor(
    private readonly repository: ForFavoritoRepositoryPort,
    private readonly sysobjectRepository: ForSysObjectRepositoryPort,
  ) {}

  async execute(filter: FavoritoFilter, limit: number): Promise<{ data: FavoritoResponse[]; meta: Meta }> {
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
