import { FullSysObject } from '../sysobject'

/**
 * Modelo de respuesta de la API que contiene un objeto de sistema completo (`FullSysObject`)
 * junto con un identificador de correlación de trazabilidad.
 */
export interface FullSysObjectApiResponse {
  correlationId: string
  data: FullSysObject
}
