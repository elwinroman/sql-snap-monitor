import { connection } from '../config/database'
import { ERROR_CODES } from '../constants/error-codes'

export class AuthModel {
  static async login({ credentials }) {
    const { conn } = await connection({ credentials })
    const request = conn.request()

    try {
      const stmt = 'SELECT 1 AS login'
      const res = await request.query(stmt)

      return res
    } catch (err) {
      const { number, message } = err.originalError.info
      return { ...ERROR_CODES.EREQUEST, originalError: { number, message } }
    } finally {
      conn.close()
    }
  }
}
