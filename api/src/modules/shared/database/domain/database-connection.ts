import { Credential } from '@shared/database/domain/credential'
import { ConnectionPool } from 'mssql'

export interface DatabaseConnection {
  connect(config: Credential): Promise<ConnectionPool>
}
