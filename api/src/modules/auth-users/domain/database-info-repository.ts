import { DatabaseInfo } from './database-info'

export interface DatabaseInfoRepository {
  getInfo(): Promise<DatabaseInfo>
}
