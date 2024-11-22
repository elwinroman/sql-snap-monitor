// todo. añadir jsdocs
export interface User {
  idUsuario: number
  cHashUsuarioUID: string
  cUsuario: string
  cServer: string
  cAliasServer: string
  dtFechaRegistro: Date
  lVigente: boolean
}

export type UserInput = Omit<User, 'idUsuario' | 'dtFechaRegistro' | 'lVigente'>
export type ResponseUserData = Pick<User, 'idUsuario' | 'cUsuario' | 'lVigente'>

export interface ForRetrievingUser {
  registerUser(user: UserInput): Promise<boolean | undefined>
  findUserByUsername(usernameHash: string): Promise<ResponseUserData | undefined>
}
