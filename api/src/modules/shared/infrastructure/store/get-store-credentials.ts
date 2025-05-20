import CryptoCode from '@shared/utils/cryptocode.util'

import {
  DBNAME,
  DBPASSWORD,
  DBSERVER,
  DBUSERNAME,
  FINLOG_DBNAME,
  FINLOG_DBPASSWORD,
  FINLOG_DBSERVER,
  FINLOG_DBUSERNAME,
  NODE_ENV,
  PREPROD_DBNAME,
  PREPROD_DBPASSWORD,
  PREPROD_DBSERVER,
  PREPROD_DBUSERNAME,
} from '@/config/enviroment'
import { MODE } from '@/constants'
import { StoreUserSchema } from '@/modules/shared/domain/store'

import { DatabaseName } from './database.enum'
import { UserType, UserTypeEnum } from './mssql-database-connection'

/** Credenciales estáticas (para uso sincrónico) */
const STATIC_CREDENTIALS: Record<DatabaseName.PREPROD | DatabaseName.APP | DatabaseName.LOG, StoreUserSchema> = {
  [DatabaseName.PREPROD]: {
    host: PREPROD_DBSERVER,
    database: PREPROD_DBNAME,
    user: NODE_ENV === MODE.development ? PREPROD_DBUSERNAME : CryptoCode.encrypt(PREPROD_DBUSERNAME),
    password: NODE_ENV === MODE.development ? PREPROD_DBPASSWORD : CryptoCode.encrypt(PREPROD_DBPASSWORD),
  },
  [DatabaseName.APP]: {
    host: DBSERVER,
    database: DBNAME,
    user: NODE_ENV === MODE.development ? DBUSERNAME : CryptoCode.encrypt(DBUSERNAME),
    password: NODE_ENV === MODE.development ? DBPASSWORD : CryptoCode.encrypt(DBPASSWORD),
  },
  [DatabaseName.LOG]: {
    host: FINLOG_DBSERVER,
    database: FINLOG_DBNAME,
    user: NODE_ENV === MODE.development ? FINLOG_DBUSERNAME : CryptoCode.encrypt(FINLOG_DBUSERNAME),
    password: NODE_ENV === MODE.development ? FINLOG_DBPASSWORD : CryptoCode.encrypt(FINLOG_DBPASSWORD),
  },
}

/**
 * Retorna las credenciales internas de la base de datos según el nombre y el tipo (Interna)
 * @throws {Error} Si el nombre de base de datos no existe o credenciales no disponibles
 */
export function getStaticDatabaseCredentials(name: DatabaseName): { credentials: StoreUserSchema; type: UserType } {
  if (!(name in STATIC_CREDENTIALS)) throw new Error(`Nombre de base de datos no estática: ${name}`)

  return { credentials: STATIC_CREDENTIALS[name], type: UserTypeEnum.Internal }
}
