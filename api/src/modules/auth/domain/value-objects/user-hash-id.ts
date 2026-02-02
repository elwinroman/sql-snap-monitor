import crypto from 'node:crypto'

// Value Object para el hashId
export class UserHashId {
  private constructor(private readonly value: string) {}

  static create(user: string, host: string, hash?: string): UserHashId {
    if (!hash) return new UserHashId(this.generate(user, host))

    // si existe el hash
    const expectedHash = this.generate(user, host)

    if (hash !== expectedHash) {
      throw new Error(`[auth] Hash inválido para el usuario '${user}', se ha creado incorrectamente o sido manipulado en la bd`)
    }

    if (hash.length !== 32) {
      throw new Error('[auth] Hash inválido, debe tener 32 caracteres')
    }

    return new UserHashId(hash)
  }

  /**
   * Genera un hash MD5 único basado en el `server` y el `username`.
   *
   * @param {string} username - Nombre del usuario.
   * @param {string} hostname - Nombre o identificador del host (no el alias).
   *
   * @returns {string} El hash MD5 de 32 caracteres generado a partir de la concatenación de `server` y `username`.
   */
  static generate(user: string, host: string): string {
    const username = user.toLowerCase()

    return crypto
      .createHash('md5')
      .update(host + username, 'utf8')
      .digest('hex')
  }

  get getValue(): string {
    return this.value
  }
}
