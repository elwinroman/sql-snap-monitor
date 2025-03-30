import { CacheRepository } from '@shared/cache/domain/cache-repository'

import { valkeyClient } from './valkey-instance'

/**
 * Repositorio de caché que utiliza Valkey (alternativa a Redis).
 * Implementa la interfaz `CacheRepository` para gestionar operaciones de caché.
 */
export class ValkeyCacheRepository implements CacheRepository {
  async set(key: string, value: string, ttl = 3600): Promise<void> {
    await valkeyClient.set(key, value, 'EX', ttl)
  }

  async get(key: string): Promise<string | null> {
    return await valkeyClient.get(key)
  }

  async delete(key: string): Promise<void> {
    await valkeyClient.del(key)
  }
}
