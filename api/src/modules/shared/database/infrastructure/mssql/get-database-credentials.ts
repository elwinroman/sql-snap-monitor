import { getUserId } from '@auth-users/infrastructure/user-context.storage'
import { ValkeyCacheRepository } from '@shared/cache/infrastructure/valkey-cache-repository'
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

const valkeyCacheRepository = new ValkeyCacheRepository()

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

/**
 * Obtiene credenciales (versión asíncrona completa)
 * @throws {Error} Si el nombre no es válido o no se obtienen credenciales
 */
export async function getUserDatabaseCredentialsFromCache(): Promise<Credential> {
  const userId = getUserId()
  if (!userId) throw new Error('ID de usuario no disponible en el contexto.')

  const cacheCredentials = await valkeyCacheRepository.get(`user:${userId}:credential`)

  if (!cacheCredentials) throw new Error(`Credenciales no encontradas para el usuario ${userId}.`)

  return JSON.parse(cacheCredentials)
}
