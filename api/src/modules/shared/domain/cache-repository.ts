/**
 * Interfaz que define las operaciones básicas para interactuar con un sistema de caché.
 */
export interface CacheRepository {
  /** Almacena un valor en la caché con una clave específica y un tiempo de vida opcional (default: 3600s). */
  set(key: string, value: string, ttl?: number): Promise<void>

  /** Recupera un valor de la caché utilizando una clave específica. */
  get(key: string): Promise<string | null>

  /** Elimina un valor de la caché utilizando una clave específica. */
  delete(key: string): Promise<void>

  /** Retorna el tiempo de vida restante (en segundos) de una clave. -2 si no existe, -1 si no tiene TTL. */
  ttl(key: string): Promise<number>
}
