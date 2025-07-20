/**
 * Estado de configuración del editor de código, que controla
 * opciones visuales y funcionales relacionadas con la edición.
 */
export interface BearEditorOptionsState {
  /** Tamaño de fuente utilizado en el editor (en píxeles). */
  fontSize: number

  /**
   * Controla cómo se muestran los caracteres de espacio en blanco
   * (por ejemplo, espacios y tabulaciones). Valores típicos pueden ser
   * 'none', 'boundary', 'all', etc., según la implementación del editor.
   */
  renderWhitespace: string

  /**
   * Indica si el editor debe mostrar vistas lado a lado (side-by-side),
   * común en editores de comparación o diffs.
   */
  renderSideBySide: boolean

  /** Tema visual aplicado al editor, e.g., 'light', 'dark', etc. */
  theme: string

  /** Actualiza el tamaño de fuente del editor. */
  updateFontSize: (size: number) => void

  /** Cambia la configuración de visualización de espacios en blanco. */
  updateRenderWhitespace: (value: string) => void

  /** Establece si el editor muestra vista lado a lado o no. */
  updateRenderSideBySide: (state: boolean) => void

  /** Cambia el tema visual del editor. */
  updateTheme: (theme: string) => void
}
