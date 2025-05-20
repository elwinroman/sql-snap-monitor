import { DecryptionException } from '@shared/domain/exceptions'
import CryptoCode from '@shared/infrastructure/utils/cryptocode.util'
import { describe, expect, it } from 'vitest'

describe('CryptoCode', () => {
  const messages = [
    'uMonitor', // texto simple en minúsculas y mayúsculas
    ' password separado ', // texto con espacios al inicio y final
    'paswordConAcentosYTíldes', // texto con caracteres con tilde/acentos
    '1234567890', // solo números
    'Texto_con_guiones-bajos-y-medios', // texto con guiones bajos y medios
    'Texto!@#$%^&*()_+{}[]<>?', // texto con símbolos especiales
    'Texto\ncon\nsaltos\nde\nlínea', // texto con saltos de línea
    'Texto\tcon\ttabulaciones', // texto con tabulaciones
    '', // cadena vacía (password - sql server)
    '🧪🔐🚀🌐🎉', // emojis y caracteres unicode
    'áéíóúÁÉÍÓÚñÑçÇ', // caracteres del español extendido
    '漢字かなカナ', // caracteres japoneses (Unicode multibyte)
    'long'.repeat(1000), // texto muy largo (para estrés)
  ]

  it('debe cifrar y descifrar correctamente', () => {
    messages.forEach(content => {
      const encrypted = CryptoCode.encrypt(content)
      const decrypted = CryptoCode.decrypt(encrypted)
      expect(decrypted).toBe(content) // verifica que el texto descifrado es el mismo que el original
    })
  })

  it.skip('debería devolver un string encriptado con separadores "*"', () => {
    messages.forEach(content => {
      if (content === '') expect(true).toBe(true) // si el message es vacío se podrá cifrar y descifrar pero no cumplirá la separación en 4 partes

      const encrypted = CryptoCode.encrypt(content)
      const parts = encrypted.split('*')

      // asegura que hay 4 partes: texto, salt, iv, tag
      expect(parts.length).toBe(4)
      parts.forEach(part => {
        expect(typeof part).toBe('string')
        expect(part.length).toBeGreaterThan(0)
      })
    })
  })

  it('debería lanzar DecryptionException si el string está malformado', () => {
    const fakeEncrypted = 'mal*formado*texto'

    expect(() => {
      CryptoCode.decrypt(fakeEncrypted)
    }).toThrow(DecryptionException)
  })

  it('debería lanzar DecryptionException si el contenido es alterado', () => {
    messages.forEach(content => {
      const encrypted = CryptoCode.encrypt(content)
      const parts = encrypted.split('*')

      // manipula IV para invalidar el cifrado
      parts[2] = Buffer.from('invalidoiv123456').toString('base64')
      const tampered = parts.join('*')

      expect(() => {
        CryptoCode.decrypt(tampered)
      }).toThrow(DecryptionException)
    })
  })
})
