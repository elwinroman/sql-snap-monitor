import {
  DBNAME,
  DBPASSWORD,
  DBSERVER,
  DBUSERNAME,
  PREPROD_DBNAME,
  PREPROD_DBPASSWORD,
  PREPROD_DBSERVER,
  PREPROD_DBUSERNAME,
} from '@/config/enviroment'

export interface Credentials {
  server: string
  username: string
  password: string
  dbname: string
}

export const CredentialsFromEnv_PREPROD: Credentials = {
  server: PREPROD_DBSERVER,
  username: PREPROD_DBUSERNAME,
  password: PREPROD_DBPASSWORD,
  dbname: PREPROD_DBNAME,
}

export const CredentialsFromEnv: Credentials = {
  server: DBSERVER,
  username: DBUSERNAME,
  password: DBPASSWORD,
  dbname: DBNAME,
}
