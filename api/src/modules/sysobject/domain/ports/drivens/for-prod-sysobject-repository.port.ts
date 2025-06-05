import { PermissionRol } from '@sysobject/domain/schemas/permission-rol'
import { SysObject } from '@sysobject/domain/schemas/sysobject'

/**
 * Puerto del repositorio de SysObject de tipo driven (secondary) que define las operaciones de acceso a datos del dominio.
 *
 * Este repositorio recupera la información desde la base de datos de pre-producción utilizando Procedimientos Almacenados.
 */
export interface ForProdSysObjectRepositoryPort {
  /**
   * Obtiene un objeto del sistema (`SysObject`) por su identificador único. No incluye el objeto de tipo USER_TABLE
   *
   * @param id - Identificador del objeto.
   * @returns Una promesa que resuelve con el objeto si existe, o `null` si no se encuentra.
   */
  getByNameAndSchema(name: string, schema: string): Promise<SysObject | null>

  /**
   * Recupera la lista de roles con permisos asociados a un objeto determinado.
   *
   * @param id - Identificador del objeto.
   * @returns Una promesa que resuelve con un arreglo de `PermissionRol`.
   */
  getRolesById(id: number): Promise<PermissionRol[]>
}
