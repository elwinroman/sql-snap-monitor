import type * as monaco from 'monaco-editor'

export const BaseMonacoEditorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  /** Si `true`, el editor será de solo lectura. */
  readOnly: true,

  /** Fuente utilizada en el editor. */
  fontFamily: 'Fira Code Variable',

  /** Controla el salto de línea automático. */
  wordWrap: 'off',

  /** Si `true`, el editor se adapta automáticamente al tamaño del contenedor. */
  automaticLayout: true,

  /** Muestra los números de línea en el margen izquierdo. */
  lineNumbers: 'on',

  /** Configura la visibilidad de las barras de desplazamiento horizontal y vertical. */
  scrollbar: {
    /** Oculta la barra de desplazamiento vertical. */
    vertical: 'auto',
    /** Muestra la barra horizontal solo si es necesario. */
    horizontal: 'auto',
  },

  /**
   * Habilita el uso de ligaduras tipográficas (como flechas, !==, etc.).
   * Útil si usas una fuente como Fira Code o JetBrains Mono.
   * ⚠️ Importante: Si se utiliza una fuente con ligaduras pero esta opción está desactivada,
   * o si se activa esta opción con una fuente que no las soporta,
   * pueden producirse errores visuales en la alineación e indentación del código.
   */
  fontLigatures: true,

  /** Si `true`, el resaltado de selección tendrá bordes redondeados. */
  roundedSelection: true,

  /** Si `true`, al hacer clic en el número de línea se selecciona toda la línea. */
  selectOnLineNumbers: true,

  /**
   * Límite de caracteres por línea a partir del cual se deja de renderizar.
   * Mejora el rendimiento en archivos grandes. -1 significa sin límite.
   */
  stopRenderingLineAfter: 1000,
}
