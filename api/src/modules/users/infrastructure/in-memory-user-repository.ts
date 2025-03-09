import { User } from '../domain/user'
import { UserRepository } from '../domain/user-repository'
/*
const users = [
  {
    idUsuario: '1',
    cHashusername_UID: '2f2f3f3fsd3',
    cUsuario: 'aroman',
    cServer: 'DEVINSTANCE',
    cAliasServer: '10.5.81.10/pruebas',
  },
  {
    idUsuario: '2',
    cHashusername_UID: 'asda2eadaw',
    user: 'dmamani',
    server: 'DEVINSTANCE',
    aliasServer: '10.5.81.10/pruebas',
  },
]
*/
const users = [
  {
    id: '1',
    hashUsernameUID: '2f2f3f3fsd3',
    user: 'aroman',
    server: 'DEVINSTANCE',
    aliasServer: '10.5.81.10/pruebas',
  },
  {
    id: '2',
    hashUsernameUID: 'asda2eadaw',
    user: 'dmamani',
    server: 'DEVINSTANCE',
    aliasServer: '10.5.81.10/pruebas',
  },
]

export class InMemoryUserRepository implements UserRepository {
  constructor() {}

  async create(user: User): Promise<void> {
    users.push(user.toValue())
    console.log(users)
  }

  async getById(id: string): Promise<User | null> {
    // console.log('InMemoryUserRepository.getById -> id es ', userId)
    const user = users.find(element => element.id === id)
    if (!user) return null

    return user ? new User(user) : null
  }
}
