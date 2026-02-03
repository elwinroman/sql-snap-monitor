import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { registry } from '@core/swagger/openapi-registry'
import { errorResponses, SuccessResponseSchema } from '@core/swagger/schemas'
import { z } from 'zod'

import { LoginUserSchema } from './login/login.http-dto'

extendZodWithOpenApi(z)

// POST /api/v1/auth/login
registry.registerPath({
  method: 'post',
  path: '/api/v1/auth/login',
  tags: ['Auth'],
  summary: 'Autenticar usuario contra SQL Server',
  description:
    'Valida credenciales contra la instancia SQL Server indicada. Retorna un access token (JWT) y setea una cookie httpOnly con el refresh token.',
  request: {
    body: { content: { 'application/json': { schema: LoginUserSchema } } },
  },
  responses: {
    200: {
      description: 'Login exitoso. Se setea cookie `refresh_token` (httpOnly).',
      content: { 'application/json': { schema: SuccessResponseSchema } },
    },
    ...errorResponses('InvalidCredentialsException', 'UserAlreadyAuthenticatedException', 'ValidationException'),
  },
})

// POST /api/v1/auth/logout
registry.registerPath({
  method: 'post',
  path: '/api/v1/auth/logout',
  tags: ['Auth'],
  summary: 'Cerrar sesión',
  description: 'Invalida el access token y limpia la cookie de refresh token.',
  request: {},
  responses: {
    200: {
      description: 'Logout exitoso. Cookie `refresh_token` eliminada.',
      content: { 'application/json': { schema: SuccessResponseSchema } },
    },
    ...errorResponses('NotProvidedTokenException', 'TokenExpiredException'),
  },
})

// POST /api/v1/auth/refresh-token
registry.registerPath({
  method: 'post',
  path: '/api/v1/auth/refresh-token',
  tags: ['Auth'],
  summary: 'Renovar access token',
  description: 'Genera un nuevo access token usando el refresh token de la cookie httpOnly.',
  request: {},
  responses: {
    200: {
      description: 'Token renovado exitosamente',
      content: { 'application/json': { schema: SuccessResponseSchema } },
    },
    ...errorResponses('TokenExpiredException', 'NotProvidedTokenException'),
  },
})

// GET /api/v1/auth/check-session
registry.registerPath({
  method: 'get',
  path: '/api/v1/auth/check-session',
  tags: ['Auth'],
  summary: 'Verificar sesión activa',
  description: 'Valida que el access token sea válido y la sesión esté activa.',
  security: [{ BearerAuth: [] }],
  request: {},
  responses: {
    200: {
      description: 'Sesión activa',
      content: { 'application/json': { schema: SuccessResponseSchema } },
    },
    ...errorResponses('TokenExpiredException', 'NotProvidedTokenException'),
  },
})
