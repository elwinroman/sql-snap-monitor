export interface AuthenticatedUser {
  idUser: number
  username: string
  originalServer: string
  token: string
  databaseInfo: {
    name: string
    compatibility: number
    description: string
    server: string
    date: Date | string
  }
}
