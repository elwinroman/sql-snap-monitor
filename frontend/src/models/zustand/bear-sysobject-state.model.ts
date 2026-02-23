import { FullSysObject, ViewMode } from '@/models/sysobject'

/**
 * Estado global del módulo de alineación de objetos SQL, gestionado por Zustand.
 *
 * Este estado permite controlar:
 * - el modo de visualización actual (`viewMode`)
 * - el objeto SQL cargado (`object`)
 *
 * Además, incluye funciones para modificar dicho estado o reiniciarlo.
 */
export interface BearSysObjectState {
  /** Modo de visualización actual para el objeto SQL. */
  viewMode: ViewMode

  /** Objeto SQL. Si no existe, es `null`. */
  sysobject: FullSysObject | null

  /** Código disponible visualmente en el editor (monaco) */
  currentEditorCode: string

  /** Indica si se está cargando un objeto desde el buscador */
  isLoadingObject: boolean

  /** Error al obtener el objeto SQL */
  errorObject: { title: string; detail: string } | null

  /** Obtiene un objeto por ID desde la API y actualiza el store */
  fetchSysObject: (id: number) => Promise<void>

  /** Actualiza el error del objeto SQL */
  updateErrorObject: (error: { title: string; detail: string } | null) => void

  /** Objeto SQL de pre-producción para comparación. Si no existe, es `null`. */
  prodSysobject: FullSysObject | null

  /** Indica si se está cargando el objeto de pre-producción */
  isLoadingProdObject: boolean

  /** Error al obtener el objeto de pre-producción */
  errorProdObject: { title: string; detail: string } | null

  /** Obtiene el objeto de pre-producción desde la API para comparación */
  fetchProdSysObject: () => Promise<void>

  /** Crea el objeto con la data recuperada en el buscador */
  createSysObject: (sysobject: FullSysObject | null) => void

  /** Establece un nuevo modo de visualización para el objeto. */
  updateViewMode: (mode: ViewMode) => void

  /** Establece el código del editor */
  updateCurrentEditorCode: (code: string) => void

  /** Reinicia el estado al valor inicial por defecto. */
  reset: () => void
}
