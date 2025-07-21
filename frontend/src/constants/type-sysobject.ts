/**
 * Tipos de objetos del sistema SQL Server, indexados por clave descriptiva.
 */
export const TypeSysObjects = {
  StoredProcedure: {
    type: 'P',
    typeDesc: 'SQL_STORED_PROCEDURE',
    description: 'Procedimiento almacenado',
  },
  Trigger: {
    type: 'TR',
    typeDesc: 'SQL_TRIGGER',
    description: 'Disparador (Trigger)',
  },
  View: {
    type: 'V',
    typeDesc: 'VIEW',
    description: 'Vista (View)',
  },
  TableValuedFunction: {
    type: 'TF',
    typeDesc: 'SQL_TABLE_VALUED_FUNCTION',
    description: 'Función con valor de tabla',
  },
  ScalarFunction: {
    type: 'FN',
    typeDesc: 'SQL_SCALAR_FUNCTION',
    description: 'Función escalar',
  },
} as const
