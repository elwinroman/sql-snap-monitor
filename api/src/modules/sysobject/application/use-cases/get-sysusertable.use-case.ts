import { Logger } from '@shared/domain/logger'
import { TIPO_ACCION } from '@sysobject/application/constants/action-type.constant'
import { SysObjectNotFoundException } from '@sysobject/domain/exceptions/sysobject-not-found.exception'
import { ForProxyBusquedaRecienteRegistrationPort } from '@sysobject/domain/ports/drivens/for-proxy-busqueda-reciente-registration.port'
import { ForSysUsertableRepositoryPort } from '@sysobject/domain/ports/drivens/for-sysusertable-repository.port'
import { LogObjectContext } from '@sysobject/domain/schemas/log-object-context'
import { Usertable } from '@sysobject/domain/schemas/usertable'

import { RegisterSearchLogUseCase } from './register-search-log.use-case'

export class GetSysUsertableUseCase {
  constructor(
    private readonly sysUsertableRepository: ForSysUsertableRepositoryPort,
    private readonly registerSearchLogUC: RegisterSearchLogUseCase,
    private readonly registerBusquedaRecienteProxy: ForProxyBusquedaRecienteRegistrationPort,
    private readonly logger: Logger,
  ) {}

  async execute(id: number, log: LogObjectContext): Promise<Usertable> {
    const sysUsertable = await this.sysUsertableRepository.getById(id)

    if (!sysUsertable) throw new SysObjectNotFoundException(id)

    const tableExtendedProperties = await this.sysUsertableRepository.getUsertableExtendedPropertieById(id) // descripcion (extended propertie) del usertable
    const columns = await this.sysUsertableRepository.getColumnsById(id) // columnas, incluye las descripciones (extended_properties)
    const foreignKeys = await this.sysUsertableRepository.getForeignKeysById(id) // claves foraneas
    const indexes = await this.sysUsertableRepository.getIndexesById(id) // indices

    // Guarda LOG de búsqueda con los detalles de la búsqueda realizada por el usuario.
    const currentDate = new Date()

    await this.registerSearchLogUC.execute({
      idUser: log.idUser,
      actionType: TIPO_ACCION.BusquedaRegular,
      database: log.databaseName,
      schema: sysUsertable.schemaName,
      search: sysUsertable.name,
      type: sysUsertable.type,
      isProduction: false,
      createdAt: currentDate,
    })

    // Cada vez que se realiza una búsqueda también guarda el timestamp como búsqueda reciente
    await this.registerBusquedaRecienteProxy.send({
      idUser: log.idUser,
      database: log.databaseName,
      schema: sysUsertable.schemaName,
      objectName: sysUsertable.name,
      type: sysUsertable.type,
      dateSearch: currentDate,
      isActive: true,
    })

    this.logger.info('[sysobject] Usertable recuperado', {
      objectId: sysUsertable.id,
      objectName: sysUsertable.name,
      type: sysUsertable.type,
      schema: sysUsertable.schemaName,
      database: log.databaseName,
      columnsCount: columns.length,
      foreignKeysCount: foreignKeys.length,
      indexesCount: indexes.length,
    })

    return { ...sysUsertable, extendedProperties: tableExtendedProperties, columns, foreignKeys, indexes }
  }
}
