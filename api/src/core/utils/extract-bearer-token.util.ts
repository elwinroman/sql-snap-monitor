/**
 * Extrae el token Bearer de un encabezado Authorization.
 *
 * @param authHeader - Encabezado Authorization (puede ser undefined).
 * @returns El token si es válido, o null si no lo es.
 */
export function extractBearerToken(authHeader?: string): string | null {
  if (!authHeader) return null

  const match = authHeader.match(/^Bearer\s+([^\s]+)$/i)
  return match ? match[1] : null
}
