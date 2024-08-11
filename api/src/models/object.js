import { connection } from '../config/database.js'
import { ERROR_CODES } from '../constants/error-codes.js'

export class ObjectModel {
  /**
   * Busca un objeto en la base de datos por su nombre (devuelve todas las coincidencias)
   *
   * @param {Object} params - Objeto que contiene los parametros para la consulta
   * @param {String} params.name - Nombre del objeto
   * @param {Object} params.credentials - Credenciales de conexión a la base de datos
   *
   * @returns {Promise<Object>} - Objeto con la definición del objeto o un error
   */
  static async findObject ({ name, credentials }) {
    const { conn, sql } = await connection({ credentials })
    const request = conn.request()

    try {
      const stmt = `
                    SELECT  A.object_id,  A.name,             TRIM(A.type) AS type, A.type_desc,
                            B.schema_id,  B.name AS _schema,  A.create_date,        A.modify_date
                    FROM sys.objects        A
                    INNER JOIN sys.schemas  B ON B.schema_id = A.schema_id
                    WHERE A.name = @name
                  `
      await request.input('name', sql.VarChar, name)
      const res = await request.query(stmt)

      if (res.rowsAffected[0] === 0) return ERROR_CODES.NOT_FOUND

      const objects = res.recordset.map(obj => {
        return {
          id: obj.object_id,
          name: obj.name,
          type: obj.type,
          typeDesc: obj.type_desc,
          schema: obj._schema,
          createDate: obj.create_date,
          modifyDate: obj.modify_date
        }
      })

      return { status: 'success', statusCode: 200, objects, meta: { length: objects.length } }
    } catch (err) {
      const { number, message } = err.originalError.info
      return { ...ERROR_CODES.EREQUEST, originalError: { number, message } }
    } finally {
      conn.close()
    }
  }

  /**
   * Obtiene la definición de un objeto de la base de datos (que no sea una tabla)
   *
   * @param {Object} params - Objecto que contiene los parámetros para la consulta
   * @param {String} params.id - Identificador del objeto
   * @param {Object} params.credentials - Credenciales de conexión a la base de datos
   *
   * @returns {Promise<Object>} - Objeto con la definición del objeto o un error
   */
  static async getObjectDefinition ({ id, credentials }) {
    const { conn, sql } = await connection({ credentials })
    const request = conn.request()

    try {
      const stmt = `SELECT definition
                    FROM sys.sql_modules
                    WHERE object_id = @id
                  `
      await request.input('id', sql.VarChar, id)
      const res = await request.query(stmt)

      if (res.rowsAffected[0] === 0) return ERROR_CODES.NOT_FOUND

      return { status: 'success', statusCode: 200, ...res.recordset[0] }
    } catch (err) {
      const { number, message } = err.originalError.info
      return { ...ERROR_CODES.EREQUEST, originalError: { number, message } }
    } finally {
      conn.close()
    }
  }

  /**
   * Obtiene la descripción de un objeto de la base de datos
   * ⚠️ Soportado solo para tablas y vistas, puede no funcionar para otros tipos de objetos
   *
   * @param {Object} params - Objeto con el nombre y el schema del objeto
   * @param {String} params.id - Identificador del objeto
   * @param {Object} params.credentials - Credenciales de conexión a la base de datos
   *
   * @returns {Promise<Object>} - Objeto con la descripción del objeto o un error
   */
  static async getObjectDescription ({ id, credentials }) {
    const { conn, sql } = await connection({ credentials })
    const request = conn.request()

    try {
      // obtiene la descripción de las columnas
      const stmt = `
                    SELECT A.name, A.column_id, C.minor_id, C.value, C.name AS property_name
                    FROM sys.columns                  A
                    INNER JOIN sys.objects            B ON B.object_id = A.object_id
                    LEFT JOIN sys.extended_properties C ON C.major_id = B.object_id AND C.minor_id = A.column_id
                    WHERE A.object_id = @id
                  `
      await request.input('id', sql.Int, id)
      const res = await request.query(stmt)
      const columnDescription = res.recordset

      // obtiene la descripción del objeto
      const stmt2 = `
                    SELECT B.minor_id, B.value, B.name AS property_name
                    FROM sys.objects                    A
                    INNER JOIN sys.extended_properties  B ON B.major_id = A.object_id
                    WHERE A.object_id = @id2 AND B.minor_id = 0
                  `
      await request.input('id2', sql.Int, id)
      const res2 = await request.query(stmt2)
      const objectDescription = res2.recordset

      if (res.rowsAffected[0] === 0 && res2.rowsAffected[0] === 0) return ERROR_CODES.NOT_FOUND_DESCRIPTION

      return {
        status: 'success',
        statusCode: 200,
        data: { objectDescription, columnDescription },
        meta: { lengthObject: objectDescription.length, lengthColumn: columnDescription.length }
      }
    } catch (err) {
      const { number, message } = err.originalError.info
      return { ...ERROR_CODES.EREQUEST, originalError: { number, message } }
    } finally {
      conn.close()
    }
  }
}
