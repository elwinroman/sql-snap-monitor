import { LogObjectContext, LogProdObjectContext } from '@sysobject/domain/schemas/log-object-context'
import { PermissionRol } from '@sysobject/domain/schemas/permission-rol'
import { SysObject, TypeSysObject } from '@sysobject/domain/schemas/sysobject'
import { Usertable } from '@sysobject/domain/schemas/usertable'

export type SearchSysObject = Pick<SysObject, 'id' | 'name' | 'schemaName' | 'typeDesc'>

/**
 * Puerto de acceso (interface) de tipo driver (primary) para recuperar objetos del sistema (SysObject)
 * desde una fuente de datos como base de datos o caché.
 *
 * Se utiliza en la capa de aplicación para desacoplar la lógica de acceso a datos.
 */
export interface ForSysObjectRetrievalPort {
  /**
   * Recupera un objeto del sistema por su ID, incluyendo los roles con permisos sobre él.
   *
   * @param id - Identificador único del objeto.
   * @returns Una promesa que resuelve con el objeto y sus permisos asociados.
   */
  getSysObject(id: number, log: LogObjectContext): Promise<SysObject & { permission: PermissionRol[] }>

  /**
   * Realiza una búsqueda de sugerencias de objetos del sistema, basada en el nombre parcial y tipo.
   *
   * @param name - Nombre parcial o completo del objeto a buscar.
   * @param type - Tipo de objeto (por ejemplo, 'P', 'FN', 'V', etc.).
   * @returns Una promesa que resuelve con una lista de objetos que coinciden con el criterio.
   */
  searchSuggestions(name: string, type: TypeSysObject): Promise<SearchSysObject[]>

  /**
   * Recupera una tabla de usuario por su ID.
   *
   * @param id - Identificador único de la tabla de usuario.
   * @returns Una promesa que resuelve con la tabla de usuario correspondiente.
   */
  getSysUsertable(id: number, log: LogObjectContext): Promise<Usertable>

  /**
   * Recupera un objeto del sistema desde el entorno de producción, incluyendo los roles con permisos sobre él.
   *
   * @param name - Nombre del objeto a recuperar.
   * @param schema - Nombre del esquema al que pertenece el objeto.
   * @param actionType - Tipo de acción realizado (recuperación por comparación, recuperación por búsqueda normal)
   * @param log - Log de contexto para el registro de trazabilidad.
   * @returns Una promesa que resuelve con el objeto y sus permisos asociados.
   */
  getProdSysObject(
    name: string,
    schema: string,
    actionType: number,
    log: LogProdObjectContext,
  ): Promise<SysObject & { permission: PermissionRol[] }>
}
