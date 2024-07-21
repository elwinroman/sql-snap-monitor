/**
 * Comprueba si una linea de texto es una linea en blanco
 * en Windows (y muchos viejos OSs)         : \r\n (soportado)
 * en Unix y todos sistemas basados en Unix : \n (soportado)
 * en sitemas viejos Mac (pre-OS X)         : \r (no soportado)
 *
 * @param {String} textLine
 * @returns {Boolean} Retorna true si es una linea en blanco, de lo contrario false
 * @example isBlankLine('Hola\r\nMundo') // false
 */
export const isBlankLine = (textLine) => {
  const blankLineRegex = /^\s*\r?\n\s*$/

  return blankLineRegex.test(textLine)
}
