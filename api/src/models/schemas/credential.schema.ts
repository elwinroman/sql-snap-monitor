import { encrypt } from '@/utils'

export interface Credentials {
  server: string
  username: string
  password: string
  dbname: string
}

export const CredentialsInitialState: Credentials = {
  server: '',
  username: '',
  password: '',
  dbname: '',
}

export const CredentialsFromEnv: Credentials = {
  server: process.env.DB_SERVER || '',
  username: process.env.DB_USERNAME || '',
  password: encrypt(process.env.DB_PASSWORD as string) || '',
  dbname: process.env.DB_NAME || '',
}
