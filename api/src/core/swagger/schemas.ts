import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { httpErrorMap } from '@core/http/http-error-map'
import { z } from 'zod'

extendZodWithOpenApi(z)

/** Schema de error estándar — refleja exactamente lo que devuelve handleErrorMiddleware */
export const ErrorResponseSchema = z
  .object({
    correlationId: z.string().uuid(),
    error: z.object({
      type: z.string().openapi({ example: 'ValidationException' }),
      title: z.string().openapi({ example: 'Error de validación' }),
      status: z.number().openapi({ example: 422 }),
      detail: z.string().openapi({ example: 'Los parámetros proporcionados no son válidos' }),
      errorCode: z.number().openapi({ example: 1000 }),
      invalidParams: z.array(z.any()).optional().openapi({ description: 'Solo presente en errores de validación Zod (422)' }),
    }),
  })
  .openapi('ErrorResponse')

/** Schema de respuesta exitosa estándar */
export const SuccessResponseSchema = z
  .object({
    correlationId: z.string().uuid(),
    data: z.any(),
  })
  .openapi('SuccessResponse')

/** Schema de respuesta exitosa con metadata (para listas paginadas) */
export const SuccessListResponseSchema = z
  .object({
    correlationId: z.string().uuid(),
    meta: z.any(),
    data: z.array(z.any()),
  })
  .openapi('SuccessListResponse')

/** Schema de respuesta exitosa con mensaje (para operaciones de escritura) */
export const SuccessMessageResponseSchema = z
  .object({
    correlationId: z.string().uuid(),
    message: z.string(),
    data: z.any(),
  })
  .openapi('SuccessMessageResponse')

/** Schema de respuesta de eliminación */
export const DeleteResponseSchema = z
  .object({
    correlationId: z.string().uuid(),
    data: z.object({ msg: z.string() }),
  })
  .openapi('DeleteResponse')

type ErrorResponseConfig = Record<number, { description: string; content: { 'application/json': { schema: typeof ErrorResponseSchema } } }>

/**
 * Metadata de excepciones extraída de las clases de dominio/aplicación.
 * Refleja los valores estáticos de `title` y `detail` de cada excepción.
 */
const exceptionMeta: Record<string, { title: string; detail: string }> = {
  // Global
  ValidationException: { title: 'Parámetros inválidos', detail: 'Algunos campos no cumplen con el formato esperado.' },
  RouteNotFoundException: { title: 'Ruta no encontrada', detail: 'La dirección solicitada no existe o no está disponible.' },
  InternalServerErrorException: { title: 'Error interno del sistema', detail: 'Ha ocurrido un error inesperado.' },
  SafeInternalServerErrorException: { title: 'Error interno del sistema', detail: 'No pudimos completar la operación.' },
  UnauthorizedException: { title: 'Acceso denegado', detail: 'No tienes los permisos necesarios para acceder a este recurso.' },
  ForbiddenException: { title: 'Acceso prohibido', detail: 'Tu cuenta no tiene permisos suficientes para esta acción.' },

  // Auth
  InvalidCredentialsException: {
    title: 'Autenticación fallida',
    detail: 'No se pudo conectar con el servidor. Verifique sus credenciales.',
  },
  UserAlreadyAuthenticatedException: { title: 'Sesión ya iniciada', detail: 'Ya tienes una sesión activa.' },
  TokenExpiredException: { title: 'Autenticación expirada', detail: 'El token ha expirado.' },
  NotProvidedTokenException: {
    title: 'Token de autenticación requerido',
    detail: 'Debes proporcionar el token para acceder a este recurso.',
  },
  PermissionDenyException: { title: 'Permiso denegado', detail: 'No tienes permisos para realizar esta acción.' },

  // Sysobject
  SysObjectNotFoundException: { title: 'Objeto no encontrado', detail: 'No se ha encontrado el objeto SQL solicitado.' },
  ProdSysObjectNotFoundException: { title: 'Objeto no encontrado', detail: 'No se ha encontrado el objeto en pre-producción.' },

  // Busqueda Reciente
  BusquedaRecienteNotFoundException: {
    title: 'Búsqueda reciente no encontrada',
    detail: 'La búsqueda reciente solicitada no fue encontrada.',
  },

  // Favorito
  FavoritoNotFoundException: { title: 'Favorito no encontrado', detail: 'El favorito solicitado no fue encontrado.' },
  FavoritoAlreadyExistsException: { title: 'Favorito ya existe', detail: 'El favorito ya existe para este usuario.' },
}

/**
 * Genera respuestas de error para OpenAPI a partir de los nombres de excepciones.
 * Busca automáticamente el status code en httpErrorMap y el title/detail en exceptionMeta.
 *
 * @example
 * errorResponses('InvalidCredentialsException', 'UserAlreadyAuthenticatedException', 'ValidationException')
 * // → { 401: { description: 'Autenticación fallida | Sesión ya iniciada' }, 422: { description: '...' } }
 */
export function errorResponses(...exceptionNames: (keyof typeof httpErrorMap)[]): ErrorResponseConfig {
  const statusGroups: Record<number, string[]> = {}

  for (const name of exceptionNames) {
    const config = httpErrorMap[name]
    if (!config) continue

    const meta = exceptionMeta[name]
    const label = meta
      ? `**${meta.title}** — ${meta.detail} \`errorCode: ${config.errorCode}\``
      : `${name} (errorCode: ${config.errorCode})`

    if (!statusGroups[config.status]) {
      statusGroups[config.status] = []
    }
    statusGroups[config.status].push(label)
  }

  const responses: ErrorResponseConfig = {}
  for (const [status, descriptions] of Object.entries(statusGroups)) {
    responses[Number(status)] = {
      description: descriptions.join(' | '),
      content: { 'application/json': { schema: ErrorResponseSchema } },
    }
  }

  return responses
}
