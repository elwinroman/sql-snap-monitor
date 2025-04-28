import { ForUserManagementPort } from '@auth/ports/drivens/for-user-management.port'

const userMock = {
  id: 1,
  hashId: '1n213123',
  user: 'aroman',
  server: 'D3SKT0P',
  active: true,
}

export interface User {
  id: number
  hashId: string
  user: string
  server: string
  active: boolean
}

export class UserManagerStubAdapter implements ForUserManagementPort {
  async getUser(hashId: string): Promise<User> {
    console.log(hashId)
    return Promise.resolve(userMock)
  }
  createUser(): void {
    // code here
  }
}
