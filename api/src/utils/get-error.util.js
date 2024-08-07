import { ERROR_CODES } from '../constants/error-codes.js'

/**
 * Retorna el error correspondiente
 *
 * @param {Object} err - error capturado
 * @returns {Object}
 */
export function getError ({ err }) {
  if (!err.originalError) return ERROR_CODES.INTERNAL_SERVER_ERROR

  if (err.originalError.code === 'ELOGIN') return ERROR_CODES.ELOGIN
  if (err.originalError.code === 'ETIMEOUT') return ERROR_CODES.ETIMEOUT
  if (err.originalError.code === 'ESOCKET') return ERROR_CODES.ESOCKET
}
