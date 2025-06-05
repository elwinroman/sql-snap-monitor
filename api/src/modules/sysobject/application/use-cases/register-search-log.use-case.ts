import { ForLogRepositoryPort, SearchLog } from '@sysobject/domain/ports/drivens/for-log-repository.port'
import { RegisterSearchLogErrorException } from '@sysobject/infrastructure/exceptions/register-search-log-error.exception'

export class RegisterSearchLogUseCase {
  constructor(private readonly logRepository: ForLogRepositoryPort) {}

  async execute(searchLog: SearchLog): Promise<void> {
    const log = await this.logRepository.createSearchLog(searchLog)

    if (!log) throw new RegisterSearchLogErrorException(searchLog.search, searchLog.schema)
  }
}
