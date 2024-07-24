import { connection } from '../config/database.js'
import { ERROR_CODES } from '../constants/error-codes.js'
import { formatStoreProcedure } from '../utils/object-utils.js'

const SYS_OBJECTS_TYPES = {
  VIEW: 'V',
  USER_TABLE: 'U',
  SQL_TRIGGER: 'TR',
  SQL_TABLE_VALUED_FUNCTION: 'TF',
  SQL_STORED_PROCEDURE: 'P',
  SQL_SCALAR_FUNCTION: 'FN'
}

export class ObjectModel {
  /**
   * Obtiene la información de un objeto de la base de datos
   *
   * @param {Object} params - Objeto con el nombre y el schema del objeto
   * @param {String} params.name - Nombre del objeto
   * @param {String} [params.schema = ''] - Schema del objeto (opcional)
   *
   * @returns {Promise<Object>} - Objeto con la definición del objeto o un error
   */
  static async getObject ({ name, schema = '' }) {
    const { request, sql } = await connection()

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

      if (res.rowsAffected[0] === 1) return { success: res.recordset[0] }
    } catch (err) {
      return { error: ERROR_CODES.EREQUEST }
    }
  }

  /**
   * Obtiene la definición de un objeto de la base de datos (que no sea una tabla)
   *
   * @param {Object} params - Objeto con el nombre y el schema del objeto
   * @param {String} params.name - Nombre del objeto
   * @param {String} [params.schema = ''] - Schema del objeto (opcional)
   *
   * @returns {Promise<Object>} - Objeto con la definición del objeto o un error
   */
  static async getObjectDefinition ({ name, schema = '' }) {
    const { request, sql } = await connection()

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

  /**
   * Obtiene la descripción de un objeto de la base de datos
   *
   * @param {Object} params - Objeto con el nombre y el schema del objeto
   * @param {String} params.name - Nombre del objeto
   * @param {String} [params.schema = ''] - Schema del objeto (opcional)
   *
   * @returns {Promise<Object>} - Objeto con la descripción del objeto o un error
   */
  static async getObjectDescription ({ name, schema = '' }) {
    const { request, sql } = await connection()

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
