import { NextFunction, Request, Response } from 'express'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { DomainError } from '../modules/shared/domain/exceptions/domain-error'
import { handleError } from '../modules/shared/infrastructure/middlewares/handle-error.middleware'

/*
Test a implemenetar:
1. Debe lanzar un error de dominio (TestException) (mapeado correctamente)
2. Debe lanzar un errorInterno si no está mapeado el error de Dominio (TestException)
3. Debe lanzar un errorInterno si ocurre cualquier otro tipo de error no contralado
*/

// Mock de `Request`, `Response` y `NextFunction`
const mockRequest = {} as Request
const mockResponse = {
  status: vi.fn().mockReturnThis(),
  json: vi.fn(),
} as unknown as Response
const mockNext = vi.fn() as NextFunction

describe('🛠️ Middleware handleError', () => {
  afterEach(() => {
    vi.clearAllMocks() // Limpia los mocks entre pruebas
  })

  test('📌 Debe manejar un DomainError mapeado correctamente', () => {
    const domainError = new DomainError({ message: 'Error de dominio' }) as DomainError
    domainError.type = 'SomeMappedError'

    handleError(domainError, mockRequest, mockResponse, mockNext)

    expect(mockResponse.status).toHaveBeenCalledWith(expect.any(Number))
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          type: domainError.type,
          title: domainError.message,
        }),
      }),
    )
  })

  test('📌 Debe manejar errores no mapeados como InternalServerErrorException', () => {
    const unknownError = new Error('Error desconocido')

    handleError(unknownError as DomainError, mockRequest, mockResponse, mockNext)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          type: 'InternalServerError',
          title: 'Error interno del sistema',
        }),
      }),
    )
  })

  test('📌 Debe manejar un DomainError no mapeado y convertirlo en InternalServerError', () => {
    const unhandledDomainError = new DomainError({ message: 'Error no manejado' }) as DomainError
    unhandledDomainError.type = 'UnhandledError'

    handleError(unhandledDomainError, mockRequest, mockResponse, mockNext)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          type: 'InternalServerError',
        }),
      }),
    )
  })
})
