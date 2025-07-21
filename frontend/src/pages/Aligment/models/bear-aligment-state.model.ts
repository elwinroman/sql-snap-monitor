import { FullSysObject, ViewMode } from '@/models/sysobject'

/**
 * Estado global del módulo de alineación de objetos SQL, gestionado por Zustand.
 *
 * Este estado permite controlar:
 * - el modo de visualización actual (`viewMode`)
 * - la visibilidad del menú lateral (`hideMenu`)
 * - el objeto SQL cargado (`object`)
 *
 * Además, incluye funciones para modificar dicho estado o reiniciarlo.
 */
export interface BearAligmentState {
  /** Modo de visualización actual para el objeto SQL. */
  viewMode: ViewMode

  /** Indica si el menú lateral está oculto (`true`) o visible (`false`). */
  hideMenu: boolean

  /** Objeto SQL cargado en el contexto de alineación. Si no hay ninguno cargado, es `null`. */
  sysobject: FullSysObject | null

  createSysObject: (sysobject: FullSysObject | null) => void

  /** Establece un nuevo modo de visualización para el objeto. */
  updateViewMode: (mode: ViewMode) => void

  /** Cambia la visibilidad del menú lateral. */
  updateHideMenu: (state: boolean) => void

  /** Reinicia el estado al valor inicial por defecto. */
  reset: () => void
}
