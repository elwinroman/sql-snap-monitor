import 'dotenv/config'

import { createCipheriv, createDecipheriv } from 'node:crypto'

if (!process.env.ENCRYPT_KEY || !process.env.ENCRYPT_IV) {
  throw new Error('ENCRYPT_KEY y ENCRYPT_IV deben ser definidas en las variables de entorno')
}

const key = Buffer.from(process.env.ENCRYPT_KEY, 'utf-8')
const iv = Buffer.from(process.env.ENCRYPT_IV, 'utf-8')

export function encrypt(text: string) {
  try {
    const cipher = createCipheriv('aes-256-cbc', key, iv)
    let encrypted = cipher.update(text, 'utf-8', 'hex')
    encrypted += cipher.final('hex')
    return iv.toString('hex') + ':' + encrypted
  } catch {
    throw new Error(
      'Error al encriptar la contraseña, las variables de entorno deben ser definidas con valores de 32 bytes y 16 bytes respectivamente',
    )
  }
}

export function decrypt(encryptedText: string) {
  const [ivHex, encrypted] = encryptedText.split(':')
  const iv = Buffer.from(ivHex, 'hex')

  const decipher = createDecipheriv('aes-256-cbc', key, iv)
  let decrypted = decipher.update(encrypted, 'hex', 'utf-8')
  decrypted += decipher.final('utf-8')
  return decrypted
}
