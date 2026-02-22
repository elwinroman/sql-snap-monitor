import { BaseSysObjectType } from './base-sysobject-type.model'

/**
 * `ApiSysObjectType` extiende los tipos base con opciones adicionales que
 * pueden ser usadas como filtros generales en la API REST.
 *
 * Valores adicionales:
 * - 'ALL': Para indicar todos los tipos de objetos.
 * - 'ALL_EXCEPT_USERTABLE': Para indicar todos excepto tablas definidas por el usuario.
 *
 * Este tipo se puede utilizar, por ejemplo, como parámetro de consulta en rutas como:
 *   GET /api/v1/sysobject?search=objeto_a_buscar&type=ALL
 */
export type ApiSysObjectType = BaseSysObjectType | 'ALL' | 'ALL_EXCEPT_USERTABLE'
