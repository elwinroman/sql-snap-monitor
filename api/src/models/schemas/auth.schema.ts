import { CustomError } from './custom-error.schema'

export interface DatabaseInfo {
  name: string
  compatibility: number
  description: string | null
  server: string
}

export interface LoginResult {
  data: DatabaseInfo
}

export interface ForAuthenticating {
  login(): Promise<LoginResult | undefined>
  checkLogin(): Promise<string | CustomError | undefined>
}
