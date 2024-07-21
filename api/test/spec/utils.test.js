// code
import { describe, expect, it } from 'vitest'
import { isBlankLine } from '../../src/utils/dbobject-utils'

describe('Pruebas para "si es una linea en blanco (vacio)"', () => {
  it('Debería comprobar que el texto es una linea en blanco (Windows)', () => {
    expect(isBlankLine('\r\n')).toBe(true)
  })

  it('Debería comprobar que el texto es una linea en blanco (Windows) con espacios', () => {
    expect(isBlankLine('   \r\n   ')).toBe(true)
  })

  it('Debería comprobar que el texto es una linea en blanco (Unix)', () => {
    expect(isBlankLine('\n')).toBe(true)
  })

  it('Debería comprobar que el texto es una linea en blanco (Unix) con espacios', () => {
    expect(isBlankLine(' \n ')).toBe(true)
  })

  it('Debería comprobar que el texto no es una linea en blanco', () => {
    expect(isBlankLine('Hola\n\rMundo')).toBe(false)
  })

  it('Debería comprobar que el texto no es una linea en blanco que tiene fin de linea (Windows)', () => {
    expect(isBlankLine('Hola Mundo\n\r')).toBe(false)
  })

  it('Debería comprobar que el texto no es una linea en blanco que tiene fin de linea (Unix)', () => {
    expect(isBlankLine('Hola Mundo\n')).toBe(false)
  })

  it('Debería comprobar que el texto no es una linea en blanco (se invierte \\n\\r)', () => {
    expect(isBlankLine('\r\n')).toBe(true)
  })

  it('Debería comprobar que el texto no es una linea en blanco (no soportado para sistemas antiguos Mac \\r)', () => {
    expect(isBlankLine('\r')).toBe(false)
  })
})
