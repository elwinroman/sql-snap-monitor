/**
 * Formatea una fecha en formato dd/mm/yyyy
 *
 * @param {String} date - Fecha en formato ISO
 * @returns {Date} Fecha formateada
 */

export function formatLocalDate(date) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }

  return new Date(date).toLocaleDateString('es-PE', options)
}
