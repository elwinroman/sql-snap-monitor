import { PrimitiveUser } from './primitive-user.schema'

// Datos de usuario necesarios que retorna la API
export type ResponseUser = Pick<PrimitiveUser, 'id' | 'user'>
