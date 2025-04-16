import { ExternalUser, PrimitiveUser } from './schemas'

export class User {
  constructor(private atributes: PrimitiveUser) {}

  static create(createUser: ExternalUser): User {
    return new User({
      id: undefined,
      hashId: createUser.hashId,
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
