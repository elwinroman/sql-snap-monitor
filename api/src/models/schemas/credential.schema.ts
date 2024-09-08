export interface Credentials {
  server: string
  username: string
  password: string
  dbname: string
}

export const CredentialsInitialState: Credentials = {
  server: '',
  username: '',
  password: '',
  dbname: '',
}
