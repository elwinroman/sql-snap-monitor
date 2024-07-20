import sql from 'mssql'

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
    error: 'EREQUEST',
    message: 'Error en la bd, consulte con su administrador'
  },
  NOT_FOUND: {
    error: 'NOT_FOUND',
    message: 'No se ha encontrado el objeto, vuelva a intentarlo'
  },
  DUPLICATE: {
    error: 'DUPLICATE',
    message: 'Se ha encontrado multiples objetos con el mismo nombre, agrege el schema como prefijo para mayor precisión, ejemplo: dbo.objectName'
  }
}

const connection = await sql.connect(config)

export class ObjectModel {
  static async getObject ({ name }) {
    const request = connection.request()

    try {
      // Buscar el objeto
      const stmt = `SELECT name = CONCAT(B.name, '.', A.name), A.type, A.type_desc, B.name as schema_name
                    FROM sys.objects A
                    INNER JOIN sys.schemas B ON B.schema_id = A.schema_id
                    WHERE A.name = @name`
      await request.input('name', sql.VarChar, name)
      const result = await request.query(stmt)

      if (result.rowsAffected[0] === 0) return { result: ERROR_CODES.NOT_FOUND }

      // Obtener el objeto
      if (result.rowsAffected[0] === 1) {
        const info = result.recordset[0]
        const stmt2 = 'EXEC SP_HELPTEXT @schemaAndName'
        await request.input('schemaAndName', sql.VarChar, info.name)
        const result2 = await request.query(stmt2)

        const { data, total_lines } = formatStoreProcedure(result2.recordset)
        return {
          result: {
            data,
            total_lines,
            schema_name: info.schema_name,
            type: info.type_desc,
            type_desc: info.type
          }
        }
      }

      return { result: ERROR_CODES.DUPLICATE }
    } catch (err) {
      return { result: ERROR_CODES.EREQUEST }
    }
  }

  static async test () {
    const request = connection.request()

    const stmt = 'SELECT name FROM sys.schemas WHERE schema_id = 9'
    const result = await request.query(stmt)

    return result
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
    if (recordset[i].Text.includes('CREATE')) {
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
