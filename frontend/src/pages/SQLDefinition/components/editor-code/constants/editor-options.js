/**
 * @param {Boolean} readOnly - Define si el editor es de solo lectura.
 * @param {Boolean} minimap - Define si se muestra el minimapa.
 * @param {String} fontFamily - Define la fuente del editor.
 * @param {String} wordWrap - Define si se activa el salto de línea.
 * @param {Boolean} automaticLayout - Define si el layout es automático.
 * @param {String} lineNumbers - Define si se muestra el número de línea.
 * @param {Object} scrollbar - Define si se muestra la barra de desplazamiento.
 * @param {Number} fontSize - Define el tamaño de la fuente.
 * @param {String} renderWhitespace - Define si se muestra los espacios en blanco.
 * @param {Boolean} roundedSelection - Define si se muestra la selección redondeada.
 * @param {Boolean} selectOnLineNumbers - Define si se selecciona el número de línea.
 */

export const options = {
  readOnly: true,
  originalEditable: false,
  minimap: { enabled: true },
  fontFamily: 'Fira Code',
  wordWrap: 'off',
  automaticLayout: true,
  lineNumbers: 'on',
  scrollbar: {
    vertical: 'hidden',
    horizontal: 'auto',
  },
  fontSize: 14,
  roundedSelection: true,
  selectOnLineNumbers: true,
  stopRenderingLineAfter: 1000,
}