/**
 * Convierte un objeto JSON a un string con formato de código
 * añadiendo saltos de línea y tabulaciones al JSON (info de error)
 *
 * @param {JSON} json - Objeto JSON a convertir a string
 * @returns {String} - String con formato de código
 */
export function JSONtoTextCode({ json }) {
  return JSON.stringify(json, null, '\t').replaceAll('],\n\t"', '],\n\n\t"')
}

/**
 * Setea todos los parámetros de cualquier objeto a null (1 depth level)
 *
 * @param {Object} object
 * @returns {Object}
 */
export function resetObjectPropertiesTuNull({ object }) {
  const newObject = {}
  for (const key in object) newObject[key] = null

  return newObject
}

/**
 * Genera 'n' fin de lineas para el fallback de SyntaxHighlighter
 *
 * @param {Number} n - Cantidad de fin de lineas
 * @returns {String} - Fin de lineas
 */
export function fallbackEndOfLines({ n }) {
  return '\r\n'.repeat(n - 1)
}
