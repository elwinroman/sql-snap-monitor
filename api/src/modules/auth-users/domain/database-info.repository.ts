import { DatabaseInfo } from './database-info'

export interface DatabaseInfoRepository {
  testConnection(): Promise<string>
  getInfo(): Promise<DatabaseInfo>
}
