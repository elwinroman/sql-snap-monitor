import { DatabaseInfo } from '@auth-users/domain/database-info'
import { DatabaseInfoRepository } from '@auth-users/domain/database-info-repository'

export class GetDatabaseInfoUseCase {
  constructor(private readonly databaseInfoRepository: DatabaseInfoRepository) {}

  async execute(): Promise<{ databaseInfo: DatabaseInfo }> {
    const dbInfo = await this.databaseInfoRepository.getInfo()

    return {
      databaseInfo: { ...dbInfo },
    }
  }
}
