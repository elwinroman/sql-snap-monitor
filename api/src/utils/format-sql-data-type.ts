const enum SQLDataTypes {
  VARCHAR = 'varchar',
  CHAR = 'char',
  NVARCHAR = 'nvarchar',
  NCHAR = 'nchar',
  NUMERIC = 'numeric',
  DECIMAL = 'decimal',
  FLOAT = 'float',
  BINARY = 'binary',
  VARBINARY = 'varbinary',
}

/**
 * Formatea la salida para un tipo de dato de SQL
 * @param type - Tipo de dato
 * @param maxLenght - Longitud máxima
 * @param precision - Precisión
 * @param scale - Escala
 * @returns
 */
export const formatSQLDataType = (type: string, maxLenght: number, precision: number, scale: number) => {
  if (type === SQLDataTypes.VARCHAR || type === SQLDataTypes.CHAR || type === SQLDataTypes.NVARCHAR || type === SQLDataTypes.NCHAR) {
    return `${type.toLowerCase()}(${maxLenght})`
  }
  if (type === SQLDataTypes.NUMERIC || type === SQLDataTypes.DECIMAL || type === SQLDataTypes.FLOAT) {
    return `${type.toLowerCase()}(${precision}, ${scale})`
  }
  if (type === SQLDataTypes.BINARY || type === SQLDataTypes.VARBINARY) {
    return maxLenght === -1 ? `${type.toLowerCase()}(max)` : `${type.toLowerCase()}(${maxLenght})`
  }
  return type.toLowerCase()
}
