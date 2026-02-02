import { offset, removeOffset } from '@formkit/tempo'

/**
 * Convierte una fecha desde una zona horaria local a UTC.
 *
 * @param date - Fecha a convertir (puede ser un string o un objeto Date).
 * @param timeZone - Zona horaria de origen (ej. "America/Lima").
 * @returns {Date | string} - La fecha convertida en UTC.
 *
 * @throws {Error} - Si la fecha es inválida o el tipo de dato no es soportado.
 *
 * @example
 * convertLocalToUTC('2025-09-07T08:00:00', 'America/Lima')
 * // Retorna la fecha equivalente en UTC
 */
export function convertLocalToUTC(date: unknown, timeZone: string): Date | string {
  if (typeof date === 'string' || date instanceof Date) {
    const d = new Date(date)
    if (isNaN(d.getTime())) throw new Error(`Fecha inválida: ${date}`)

    const offsetToUTC = offset(date, 'UTC', timeZone)
    return removeOffset(date, offsetToUTC)
  }

  throw new Error(`Tipo no válido para fecha: ${typeof date}`)
}
