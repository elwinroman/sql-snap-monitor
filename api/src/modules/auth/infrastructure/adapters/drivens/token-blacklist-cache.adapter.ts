import { ForTokenBlacklistPort } from '@auth/domain/ports/drivens'
import { CacheRepository } from '@shared/domain/cache-repository'

export class TokenBlacklistCacheAdapter implements ForTokenBlacklistPort {
  constructor(private readonly cacheRepository: CacheRepository) {}

  async isBlacklisted(jti: string): Promise<boolean> {
    const value = await this.cacheRepository.get(`blacklist:${jti}`)
    return value !== null
  }
}
