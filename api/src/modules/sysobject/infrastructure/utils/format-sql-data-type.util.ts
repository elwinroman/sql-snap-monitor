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
 * Formatea un tipo de dato SQL con sus atributos de longitud, precisión y escala.
 *
 * @param type - Tipo de dato SQL.
 * @param maxLength - Longitud máxima del dato (para tipos de longitud variable).
 * @param precision - Precisión (para tipos numéricos).
 * @param scale - Escala (para tipos numéricos).
 * @returns Cadena formateada representando el tipo de dato con sus parámetros.
 */
export const formatSQLDataType = (type: string, maxLenght: number, precision: number, scale: number) => {
  if (type === SQLDataTypes.VARCHAR || type === SQLDataTypes.CHAR || type === SQLDataTypes.NVARCHAR || type === SQLDataTypes.NCHAR)
    return `${type.toLowerCase()}(${maxLenght})`

  if (type === SQLDataTypes.NUMERIC || type === SQLDataTypes.DECIMAL || type === SQLDataTypes.FLOAT)
    return `${type.toLowerCase()}(${precision}, ${scale})`

  if (type === SQLDataTypes.BINARY || type === SQLDataTypes.VARBINARY)
    return maxLenght === -1 ? `${type.toLowerCase()}(max)` : `${type.toLowerCase()}(${maxLenght})`

  return type.toLowerCase()
}
