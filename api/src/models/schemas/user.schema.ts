// todo. añadir jsdocs
export interface User {
  idUsuario: number
  cHashUsuarioUID: string
  cUsuario: string
  cServer: string
  cAliasServer: string
  dFechaRegistro: Date
  lVigente: boolean
}

export type UserInput = Omit<User, 'idUsuario' | 'dFechaRegistro' | 'lVigente'>
export type ResponseUser = Pick<User, 'idUsuario' | 'cUsuario' | 'lVigente'>

export interface ForRetrievingUser {
  registrarUsuario(user: UserInput): Promise<boolean | undefined>
  buscarUsuarioByUsername(usernameHash: string): Promise<ResponseUser | undefined>
}
