import { randomUUID } from 'crypto'

export interface PrimitiveUser {
  id?: number
  hashUsernameUID: string //user_uuid
  user: string
  server: string
  aliasServer: string
  // createdAt: Date
  // active: boolean
}

export class User {
  constructor(private atributes: PrimitiveUser) {}

  static create(createUser: { user: string; server: string; aliasServer: string }): User {
    return new User({
      id: undefined,
      hashUsernameUID: randomUUID(),
      user: createUser.user,
      server: createUser.server,
      aliasServer: createUser.aliasServer,
    })
  }

  toValue(): PrimitiveUser {
    return {
      id: this.atributes.id,
      hashUsernameUID: this.atributes.hashUsernameUID,
      user: this.atributes.user,
      server: this.atributes.server,
      aliasServer: this.atributes.aliasServer,
    }
  }
}
