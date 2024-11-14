import 'dotenv/config'

import { createCipheriv, createDecipheriv, createHash } from 'node:crypto'

if (!process.env.INIT_VECTOR || !process.env.PASS_PHRASE) {
  throw new Error('INIT_VECTOR y PASS_PHRASE deben ser definidas en las variables de entorno')
}

const initVector = process.env.INIT_VECTOR
const passPhrase = process.env.PASS_PHRASE

function getKey(passPhrase: string) {
  // const salt = Buffer.from([]); // No usar salt
  return createHash('sha256').update(passPhrase).digest()
  // return crypto.pbkdf2Sync(passPhrase, salt, 10000, keySize, 'sha256')
  // return crypto.pbkdf2Sync(passPhrase, salt, 100000, 32, 'sha256')
}

export function encryptString(plainText: string, urlFriendly: boolean = false) {
  try {
    const keyBytes = getKey(passPhrase)
    const iv = Buffer.from(initVector, 'utf8')
    const cipher = createCipheriv('aes-256-cbc', keyBytes, iv)

    let encrypted = cipher.update(plainText, 'utf8', 'base64')
    encrypted += cipher.final('base64')

    return urlFriendly ? encodeURIComponent(encrypted) : encrypted
  } catch {
    throw new Error('Error al encriptar la contraseña, las variables de entorno deben ser definidas [initVector] (16 bytes) y [passPhrase]')
  }
}

export function decryptString(cipherText: string) {
  try {
    const keyBytes = getKey(passPhrase)
    const iv = Buffer.from(initVector, 'utf8')
    const decipher = createDecipheriv('aes-256-cbc', keyBytes, iv)

    let decrypted = decipher.update(cipherText, 'base64', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
  } catch (e) {
    console.error(e) // error al desencriptar
  }
}
