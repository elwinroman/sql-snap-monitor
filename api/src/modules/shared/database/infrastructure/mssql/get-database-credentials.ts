import { Credential } from '@shared/database/domain/credential'

import {
  DBNAME,
  DBPASSWORD,
  DBSERVER,
  DBUSERNAME,
  PREPROD_DBNAME,
  PREPROD_DBPASSWORD,
  PREPROD_DBSERVER,
  PREPROD_DBUSERNAME,
} from '@/enviroment'

import { DatabaseName } from './database.enum'

/** Retorna las credenciales de la base de datos según el nombre */
export function getDatabaseCredentials(name: DatabaseName): Credential {
  const databases: Record<DatabaseName, Credential> = {
    [DatabaseName.PREPROD]: {
      host: PREPROD_DBSERVER,
      database: PREPROD_DBNAME,
      user: PREPROD_DBUSERNAME,
      password: PREPROD_DBPASSWORD,
    },
    [DatabaseName.APP]: {
      host: DBSERVER,
      database: DBNAME,
      user: DBUSERNAME,
      password: DBPASSWORD,
    },
  }

  return databases[name]
}
