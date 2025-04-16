import { PrimitiveUser } from './primitive-user.schema'

// Datos de usaurio que llega desde le frontend
export type ExternalUser = Omit<PrimitiveUser, 'id' | 'createdAt' | 'active'>
