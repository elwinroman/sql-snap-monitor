import sql from 'mssql'
import { isBlankLine } from '../utils/dbobject-utils.js'

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // para Azure
    trustServerCertificate: true // cambiar true para el entorno local dev / certificados autofirmados
  }
}

const ERROR_CODES = {
  EREQUEST: {
    code: 'EREQUEST',
    message: 'Error en la consulta, consulte con su administrador'
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'No se ha encontrado el objeto, vuelva a intentarlo'
  },
  AMBIGUOUS_RESULTS: {
    code: 'AMBIGUOUS_RESULTS',
    message: 'Se ha encontrado multiples coincidencias del objeto, agrege el schema como prefijo para evitar la ambiguedad, ejemplo: dbo.objectName'
  },
  NOT_FOUND_SQUEMA: {
    code: 'NOT_FOUND_SQUEMA',
    message: 'No se ha encontrado el schema, vuelva a intentarlo'
  },
  NOT_FOUND_DESCRIPTION: {
    code: 'NOT_FOUND_DESCRIPTION',
    message: 'No se ha encontrado ninguna descripción para el objeto'
  }
}

const SYS_OBJECTS_TYPES = {
  VIEW: 'V',
  USER_TABLE: 'U',
  SQL_TRIGGER: 'TR',
  SQL_TABLE_VALUED_FUNCTION: 'TF',
  SQL_STORED_PROCEDURE: 'P',
  SQL_SCALAR_FUNCTION: 'FN'
}

const connection = await sql.connect(config)

export class DBObjectModel {
  static async getObjectDefinition ({ name, schema = '' }) {
    const request = connection.request()

    try {
      // buscar el objeto
      const object = await this.getObject({ name, schema })

      if (object.error) return object

      // si el objeto es del tipo USER_TABLE no se puede obtener la definición
      if (object.success.type === SYS_OBJECTS_TYPES.USER_TABLE) return { error: ERROR_CODES.NOT_FOUND }

      const { schema_name, name: object_name } = await object.success
      const stmt = 'EXEC SP_HELPTEXT @schemaAndObjectName'
      await request.input('schemaAndObjectName', sql.VarChar, schema_name + '.' + object_name)
      const res = await request.query(stmt)

      const { data, total_lines } = formatStoreProcedure(res.recordset)
      return { success: { data, total_lines } }
    } catch (err) {
      return { error: ERROR_CODES.EREQUEST }
    }
  }

  static async test () {
    const request = connection.request()

    const stmt = 'SELECT name FROM sys.schemas WHERE schema_id = 9'
    const result = await request.query(stmt)

    return result
  }

  static async getObject ({ name, schema = '' }) {
    const request = connection.request()

    try {
      const stmt = `
                    SELECT  A.object_id,  A.name,                 TRIM(A.type) AS type, A.type_desc,
                            B.schema_id,  B.name AS schema_name,  A.create_date,        A.modify_date
                    FROM sys.objects        A
                    INNER JOIN sys.schemas  B ON B.schema_id = A.schema_id
                    WHERE A.name = @name
                  `
      await request.input('name', sql.VarChar, name)
      const res = await request.query(stmt)

      if (res.rowsAffected[0] === 0) return { error: ERROR_CODES.NOT_FOUND }

      // si se encuentra más de un objeto con el mismo nombre
      if (res.rowsAffected[0] > 1) {
        // si no se ha especificado el schema, se retorna un error
        if (schema === '') return { error: ERROR_CODES.AMBIGUOUS_RESULTS }

        // si se ha especificado el schema, se busca el objeto con el schema
        const object = res.recordset.find(obj => obj.schema_name === schema)
        if (!object) return { error: ERROR_CODES.NOT_FOUND_SQUEMA }
        return { success: object }
      }

      if (res.rowsAffected[0] === 1) {
        console.log(res.recordset[0])
        return { success: res.recordset[0] }
      }
    } catch (err) {
      return { error: ERROR_CODES.EREQUEST }
    }
  }

  static async getObjectDescription ({ name, schema = '' }) {
    const request = connection.request()

    try {
      // buscar el objeto
      const object = await this.getObject({ name, schema })
      if (object.error) return object

      const idTable = object.success.object_id

      // obtiene la descripción de las columnas
      const stmt = `
                    SELECT A.name, A.column_id, C.minor_id, C.value, C.name AS property_name
                    FROM sys.columns                  A
                    INNER JOIN sys.objects            B ON B.object_id = A.object_id
                    LEFT JOIN sys.extended_properties C ON C.major_id = B.object_id AND C.minor_id = A.column_id
                    WHERE A.object_id = @idTable
                  `
      await request.input('idTable', sql.Int, idTable)
      const res = await request.query(stmt)
      const columnDescriptions = res.recordset

      // obtiene la descripción del objeto
      const stmt2 = `
                    SELECT B.minor_id, B.value, B.name AS property_name
                    FROM sys.objects                    A
                    INNER JOIN sys.extended_properties  B ON B.major_id = A.object_id
                    WHERE A.object_id = @idTable2 AND B.minor_id = 0
                  `
      await request.input('idTable2', sql.Int, idTable)
      const res2 = await request.query(stmt2)
      const objectDescription = res2.recordset

      if (res.rowsAffected[0] === 0 && res2.rowsAffected[0] === 0) return { error: ERROR_CODES.NOT_FOUND_DESCRIPTION }

      const data = {
        column_description: columnDescriptions,
        object_description: objectDescription
      }
      return { success: { data, ...object.success } }
    } catch (err) {
      return { error: err }
    }
  }
}

/**
 * Formatea la estructura un store procedure devuelto de la base de datos
 * @param {Array} recordset Data del store procedure
 * @returns {Object} Objeto con la estructura del store procedure
 */
const formatStoreProcedure = (recordset) => {
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
