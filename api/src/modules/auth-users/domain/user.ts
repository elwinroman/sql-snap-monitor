import { randomUUID } from 'crypto'

export interface PrimitiveUser {
  id?: number
  hashId: string
  user: string
  server: string
  aliasServer: string
  createdAt?: Date
  active?: boolean
}

export class User {
  constructor(private atributes: PrimitiveUser) {}

  static create(createUser: { user: string; server: string; aliasServer: string }): User {
    return new User({
      id: undefined,
      hashId: randomUUID(),
      user: createUser.user,
      server: createUser.server,
      aliasServer: createUser.aliasServer,
      createdAt: new Date(),
      active: true,
    })
  }

  toValue(): PrimitiveUser {
    return {
      id: this.atributes.id,
      hashId: this.atributes.hashId,
      user: this.atributes.user,
      server: this.atributes.server,
      aliasServer: this.atributes.aliasServer,
      createdAt: this.atributes.createdAt,
      active: this.atributes.active,
    }
  }
}
