import { SysObjectNotFoundException } from '@sysobject/domain/exceptions/sysobject-not-found.exception'
import { ForSysObjectRepositoryPort } from '@sysobject/domain/ports/drivens/for-sysobject-repository.port'
import { PermissionRol } from '@sysobject/domain/schemas/permission-rol'
import { SysObject } from '@sysobject/domain/schemas/sysobject'

export class GetSysObjectUseCase {
  constructor(private readonly sysObjectRepository: ForSysObjectRepositoryPort) {}

  async execute(id: number): Promise<SysObject & { permission: PermissionRol[] }> {
    const sysObject = await this.sysObjectRepository.getById(id)
    const roles = await this.sysObjectRepository.getRolesById(id)

    if (!sysObject) throw new SysObjectNotFoundException(id)

    return { ...sysObject, permission: roles }
  }
}
