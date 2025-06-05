import { AuthContext } from '@auth/infrastructure/auth-context' //TODO: mover la interface al dominio
import { getCacheDatabaseCredentials } from '@shared/infrastructure/store'
import { SysObjectNotFoundException } from '@sysobject/domain/exceptions/sysobject-not-found.exception'
import { ForSysObjectRepositoryPort } from '@sysobject/domain/ports/drivens/for-sysobject-repository.port'
import { PermissionRol } from '@sysobject/domain/schemas/permission-rol'
import { SysObject } from '@sysobject/domain/schemas/sysobject'

import { RegisterSearchLogUseCase } from './register-search-log.use-case'

export class GetSysObjectUseCase {
  constructor(
    private readonly sysObjectRepository: ForSysObjectRepositoryPort,
    private readonly registerSearchLogUC: RegisterSearchLogUseCase,
    private readonly getAuthContext: () => AuthContext | undefined,
  ) {}

  async execute(id: number): Promise<SysObject & { permission: PermissionRol[] }> {
    const sysObject = await this.sysObjectRepository.getById(id)
    const roles = await this.sysObjectRepository.getRolesById(id)

    if (!sysObject) throw new SysObjectNotFoundException(id)

    // Guarda LOG de búsqueda con los detalles de la búsqueda realizada por el usuario.
    const context = this.getAuthContext()
    if (!context) throw new Error('Error en la recuperación del contexto de autenticación')
    const cacheCredentials = await getCacheDatabaseCredentials(context.userId)

    await this.registerSearchLogUC.execute({
      idUser: context.userId,
      actionType: 1, // acción de tipo búsqueda - //TODO: Cuidado: Magic String
      database: cacheCredentials.credentials.database,
      schema: sysObject.schemaName,
      search: sysObject.name,
      // type: sysObject.type,
      isProduction: false,
      createdAt: new Date(),
    })

    return { ...sysObject, permission: roles }
  }
}
