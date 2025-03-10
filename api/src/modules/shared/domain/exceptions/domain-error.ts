export abstract class DomainError extends Error {
  abstract type: string
  abstract title: string
  abstract detail: string

  constructor({ message }: { message: string }) {
    super(message)
    this.name = this.constructor.name
  }
}
