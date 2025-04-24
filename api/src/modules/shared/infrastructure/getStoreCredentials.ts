import { Credential } from '@shared/domain/credential'

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

import { DatabaseName } from './database.enum'

/** Credenciales estáticas (para uso sincrónico) */
const STATIC_CREDENTIALS: Record<DatabaseName.PREPROD | DatabaseName.APP, Credential> = {
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

/**
 * Retorna las credenciales de la base de datos según el nombre
 * @throws {Error} Si el nombre de base de datos no existe o credenciales no disponibles
 */
export function getStaticDatabaseCredentials(name: DatabaseName): Credential {
  if (!(name in STATIC_CREDENTIALS)) throw new Error(`Nombre de base de datos no estática: ${name}`)

  return STATIC_CREDENTIALS[name]
}
