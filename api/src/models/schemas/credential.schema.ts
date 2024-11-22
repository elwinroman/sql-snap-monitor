import { encryptString } from '@/utils'

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
  server: process.env.PREPROD_DB_SERVER || '',
  username: process.env.PREPROD_DB_USERNAME || '',
  password: encryptString(process.env.PREPROD_DB_PASSWORD as string) || '',
  dbname: process.env.PROD_DB_NAME || '',
}
