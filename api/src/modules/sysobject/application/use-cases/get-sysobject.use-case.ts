import { TIPO_ACCION } from '@sysobject/application/constants/action-type.constant'
import { SysObjectNotFoundException } from '@sysobject/domain/exceptions/sysobject-not-found.exception'
import { ForProxyBusquedaRecienteRegistrationPort } from '@sysobject/domain/ports/drivens/for-proxy-busqueda-reciente-registration.port'
import { ForSysObjectRepositoryPort } from '@sysobject/domain/ports/drivens/for-sysobject-repository.port'
import { LogObjectContext } from '@sysobject/domain/schemas/log-object-context'
import { PermissionRol } from '@sysobject/domain/schemas/permission-rol'
import { SysObject } from '@sysobject/domain/schemas/sysobject'

import { RegisterSearchLogUseCase } from './register-search-log.use-case'

export class GetSysObjectUseCase {
  constructor(
    private readonly sysObjectRepository: ForSysObjectRepositoryPort,
    private readonly registerSearchLogUC: RegisterSearchLogUseCase,
    private readonly registerBusquedaRecienteProxy: ForProxyBusquedaRecienteRegistrationPort,
  ) {}

  async execute(id: number, log: LogObjectContext): Promise<SysObject & { permission: PermissionRol[] }> {
    const sysObject = await this.sysObjectRepository.getById(id)
    const roles = await this.sysObjectRepository.getRolesById(id)

    if (!sysObject) throw new SysObjectNotFoundException(id)

    const currentDate = new Date()

    await this.registerSearchLogUC.execute({
      idUser: log.idUser,
      actionType: TIPO_ACCION.BusquedaRegular,
      database: log.databaseName,
      schema: sysObject.schemaName,
      search: sysObject.name,
      type: sysObject.type,
      isProduction: false,
      createdAt: currentDate,
    })

    // Cada vez que se realiza una búsqueda también guarda el timestamp como búsqueda reciente
    await this.registerBusquedaRecienteProxy.send({
      idUser: log.idUser,
      database: log.databaseName,
      schema: sysObject.schemaName,
      objectName: sysObject.name,
      type: sysObject.type,
      dateSearch: currentDate,
      isActive: true,
    })

    return { ...sysObject, permission: roles }
  }
}
