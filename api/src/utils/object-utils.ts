/**
 * Comprueba si una linea de texto es una linea en blanco
 * en Windows (y muchos viejos OSs)         : \r\n (soportado)
 * en Unix y todos sistemas basados en Unix : \n (soportado)
 * en sitemas viejos Mac (pre-OS X)         : \r (no soportado)
 *
 * @param {String} textLine - Linea de texto a comprobar
 *
 * @returns {Boolean} - Retorna true si es una linea en blanco, de lo contrario false
 * @example isBlankLine('Hola\r\nMundo') // false
 */
export const isBlankLine = (textLine) => {
  const blankLineRegex = /^\s*\r?\n\s*$/

  return blankLineRegex.test(textLine)
}

/**
 * Formatea la estructura del objecto devuelto por la base de datos
 *
 * @param {Array} recordset - Data del objecto devuelto por la base de datos
 * @returns {Object} - Objeto con la estructura del store procedure
 */
export const formatStoreProcedure = (recordset) => {
  const data = []
  const checkInit = {
    flag: false,
    index: 0
  }
  for (let i = 0; i < recordset.length; i++) {
    if (!isBlankLine(recordset[i].Text) && !checkInit.flag) {
      checkInit.flag = true
      checkInit.index = i
    }
    const item = {
      line_number: (i + 1) - checkInit.index,
      code_text: recordset[i].Text
    }

    // Comprueba si el codeText contiene la palabra 'CREATE PROCEDURE' para evitar lineas innecesarias anteriores
    if (checkInit.flag) {
      data.push(item)
    }
  }

  return { data, total_lines: data.length }
}
