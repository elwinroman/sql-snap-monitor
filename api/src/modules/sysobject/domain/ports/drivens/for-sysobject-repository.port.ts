import { PermissionRol } from '@sysobject/domain/schemas/permission-rol'
import { SysObject } from '@sysobject/domain/schemas/sysobject'

type SearchSysObject = Pick<SysObject, 'id' | 'name' | 'schemaName' | 'typeDesc'>

/**
 * Puerto del repositorio de SysObject de tipo driven (secondary) que define las operaciones de acceso a datos del dominio.
 *
 * Esta interfaz abstrae la lógica de persistencia y se implementa típicamente por un adaptador
 * que accede a una base de datos o a una fuente externa.
 */
export interface ForSysObjectRepositoryPort {
  /**
   * Obtiene un objeto del sistema (`SysObject`) por su identificador único.
   *
   * @param id - Identificador del objeto.
   * @returns Una promesa que resuelve con el objeto si existe, o `null` si no se encuentra.
   */
  getById(id: number): Promise<SysObject | null>

  /**
   * Recupera la lista de roles con permisos asociados a un objeto determinado.
   *
   * @param id - Identificador del objeto.
   * @returns Una promesa que resuelve con un arreglo de `PermissionRol`.
   */
  getRolesById(id: number): Promise<PermissionRol[]>

  /**
   * Busca objetos del sistema por nombre parcial y tipo (ej. procedimiento, vista, función, etc.).
   *
   * @param name - Nombre o parte del nombre del objeto.
   * @param type - Tipo del objeto (ej. 'P', 'FN', 'V', etc.).
   * @returns Una promesa que resuelve con una lista de objetos coincidentes.
   */
  findByNameAndType(name: string, type: string): Promise<SearchSysObject[]>
  // getByNameAndSchemaFromPreprod(name: string, type: string): Promise<SysObject | null>
}
