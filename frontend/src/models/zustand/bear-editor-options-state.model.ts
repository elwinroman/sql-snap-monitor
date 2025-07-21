import { IFontSize, IMonacoTheme, IRenderSideBySide, IRenderWhitespace } from '@/models'

/**
 * Estado de configuración del editor de código, que controla
 * opciones visuales y funcionales relacionadas con la edición.
 */
export interface BearEditorOptionsState {
  /** Tamaño de fuente utilizado en el editor (en píxeles). */
  fontSize: IFontSize

  /** Controla cómo se muestran los caracteres de espacio en blanco (por ejemplo, espacios y tabulaciones). */
  renderWhitespace: IRenderWhitespace

  /**
   * Indica si el editor debe mostrar vistas lado a lado (side-by-side),
   * usado solo en el editor de comparación.
   */
  renderSideBySide: IRenderSideBySide

  /** Tema visual aplicado al editor, e.g., 'light', 'dark', etc. */
  theme: IMonacoTheme

  /** Actualiza el tamaño de fuente del editor. */
  updateFontSize: (size: IFontSize) => void

  /** Cambia la configuración de visualización de espacios en blanco. */
  updateRenderWhitespace: (value: IRenderWhitespace) => void

  /** Establece si el editor muestra vista lado a lado o no. */
  updateRenderSideBySide: (state: IRenderSideBySide) => void

  /** Cambia el tema visual del editor. */
  updateTheme: (theme: IMonacoTheme) => void
}
