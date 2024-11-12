import { CustomError } from './custom-error.schema'

export interface DatabaseInfo {
  name: string
  compatibility: number
  description: string | null
}

export interface ForAuthenticating {
  login(): Promise<DatabaseInfo | CustomError | undefined>
  checkLogin(): Promise<string | CustomError | undefined>
}
