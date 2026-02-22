import { TypeSysObjects } from '@/constants'

/**
 * `BaseSysObjectType` representa los valores de la propiedad `type`
 * definidos dentro del objeto `TypeSysObjects`.
 *
 */
export type BaseSysObjectType = (typeof TypeSysObjects)[keyof typeof TypeSysObjects]['type']
