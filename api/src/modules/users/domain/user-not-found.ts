export class UserNotFound extends Error {
  statusCode: number

  constructor(message = 'Usuario no encontrado') {
    super(message)
    this.name = 'UserNotFoundError'
    this.statusCode = 404
  }
}
