import { ProdSysObjectNotFoundException } from '@sysobject/domain/exceptions/prod-sysobject-not-found.exception'
import { ForProdSysObjectRepositoryPort } from '@sysobject/domain/ports/drivens/for-prod-sysobject-repository.port'
import { LogProdObjectContext } from '@sysobject/domain/schemas/log-object-context'
import { PermissionRol } from '@sysobject/domain/schemas/permission-rol'
import { SysObject } from '@sysobject/domain/schemas/sysobject'

import { RegisterSearchLogUseCase } from './register-search-log.use-case'

export class GetProdSysObjectUseCase {
  constructor(
    private readonly sysProdObjectRepository: ForProdSysObjectRepositoryPort,
    private readonly registerSearchLogUC: RegisterSearchLogUseCase,
  ) {}

  async execute(
    name: string,
    schema: string,
    actionType: number,
    log: LogProdObjectContext,
  ): Promise<SysObject & { permission: PermissionRol[] }> {
    const sysObject = await this.sysProdObjectRepository.getByNameAndSchema(name, schema)

    if (!sysObject) throw new ProdSysObjectNotFoundException(name, schema)

    const roles = await this.sysProdObjectRepository.getRolesById(sysObject.id)

    // registrar el log de busqueda
    const anonymousUser = null
    await this.registerSearchLogUC.execute({
      idUser: log.idUser ?? anonymousUser,
      actionType,
      database: log.databaseName,
      schema: sysObject.schemaName,
      search: sysObject.name,
      type: sysObject.type,
      isProduction: true,
      createdAt: new Date(),
    })

    return { ...sysObject, permission: roles }
  }
}
