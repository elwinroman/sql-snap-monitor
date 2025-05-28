import { SysObjectNotFoundException } from '@sysobject/domain/exceptions/sysobject-not-found.exception'
import { ForSysUsertableRepositoryPort } from '@sysobject/domain/ports/drivens/for-sysusertable-repository.port'
import { Usertable } from '@sysobject/domain/schemas/usertable'

export class GetSysUsertableUseCase {
  constructor(private readonly sysUsertableRepository: ForSysUsertableRepositoryPort) {}

  async execute(id: number): Promise<Usertable> {
    const sysUsertable = await this.sysUsertableRepository.getById(id)

    if (!sysUsertable) throw new SysObjectNotFoundException(id)

    const tableExtendedProperties = await this.sysUsertableRepository.getUsertableExtendedPropertieById(id) // descripcion (extended propertie) del usertable
    const columns = await this.sysUsertableRepository.getColumnsById(id) // columnas, incluye las descripciones (extended_properties)
    const foreignKeys = await this.sysUsertableRepository.getForeignKeysById(id) // claves foraneas
    const indexes = await this.sysUsertableRepository.getIndexesById(id) // indices

    return { ...sysUsertable, extendedProperties: tableExtendedProperties, columns, foreignKeys, indexes }
  }
}
