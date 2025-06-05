import { ProdSysObjectNotFoundException } from '@sysobject/domain/exceptions/prod-sysobject-not-found.exception'
import { ForProdSysObjectRepositoryPort } from '@sysobject/domain/ports/drivens/for-prod-sysobject-repository.port'
import { PermissionRol } from '@sysobject/domain/schemas/permission-rol'
import { SysObject } from '@sysobject/domain/schemas/sysobject'

import { RegisterSearchLogUseCase } from './register-search-log.use-case'

export class GetProdSysObjectUseCase {
  constructor(
    private readonly sysProdObjectRepository: ForProdSysObjectRepositoryPort,
    private readonly registerSearchLogUC: RegisterSearchLogUseCase,
    private databaseName: string,
  ) {}

  async execute(name: string, schema: string, actionType: number, idUser?: number): Promise<SysObject & { permission: PermissionRol[] }> {
    const sysObject = await this.sysProdObjectRepository.getByNameAndSchema(name, schema)
    if (!sysObject) throw new ProdSysObjectNotFoundException(name, schema)
    const roles = await this.sysProdObjectRepository.getRolesById(sysObject.id)

    // registrar el log de busqueda
    await this.registerSearchLogUC.execute({
      idUser: idUser ?? null,
      actionType,
      database: this.databaseName,
      schema: sysObject.schemaName,
      search: sysObject.name,
      // type: sysObject.type,
      isProduction: true,
      createdAt: new Date(),
    })

    return { ...sysObject, permission: roles }
  }
}
