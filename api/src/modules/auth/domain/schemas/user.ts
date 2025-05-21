import { UserHashId } from '../value-objects/user-hash-id'

// roles
export const UserRoleList = {
  ADMIN: 'administrador',
  ANALIST: 'analista',
  AUDIT: 'auditor',
} as const

export type UserRole = (typeof UserRoleList)[keyof typeof UserRoleList]

// Interfaz para los datos primitivos
export interface PrimitiveUser {
  id?: number
  hashId: UserHashId // Value Object en lugar de string
  user: string
  role: UserRole
  host: string
  aliasHost: string
  createdAt: string | Date
  isActive: boolean
}

// Interfaz para datos de usuario persistidos (con id obligatorio)
export interface RepoUser extends PrimitiveUser {
  id: number // id obligatorio, ya que es un usuario persistido
}

export class User {
  constructor(private atributes: PrimitiveUser) {}

  static create(createUser: {
    id?: number
    hashId?: string
    user: string
    role?: UserRole
    host: string
    aliasHost: string
    createdAt?: string | Date
    isActive?: boolean
  }): User {
    return new User({
      id: createUser.id ?? undefined,
      hashId: UserHashId.create(createUser.user, createUser.host, createUser.hashId),
      user: createUser.user.toLowerCase(),
      role: createUser.role ?? UserRoleList.ANALIST,
      host: createUser.host,
      aliasHost: createUser.aliasHost,
      createdAt: createUser.createdAt ?? new Date().toISOString(),
      isActive: createUser.isActive ?? true,
    })
  }

  // Getters
  get idValue(): number | undefined {
    return this.atributes.id
  }

  toValue(): PrimitiveUser {
    return {
      id: this.atributes.id,
      hashId: this.atributes.hashId,
      user: this.atributes.user,
      role: this.atributes.role,
      host: this.atributes.host,
      aliasHost: this.atributes.aliasHost,
      createdAt: this.atributes.createdAt,
      isActive: this.atributes.isActive,
    }
  }

  toRepoUser(): RepoUser {
    return {
      ...this.toValue(),
      id: this.atributes.id!, // este "id" debe ser obligatorio para RepoUser ya que el id ya se ha creado
    }
  }
}
