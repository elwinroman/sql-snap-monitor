import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { registry } from '@core/swagger/openapi-registry'
import { DeleteResponseSchema, errorResponses, SuccessListResponseSchema, SuccessMessageResponseSchema } from '@core/swagger/schemas'
import { z } from 'zod'

import { DeleteFavoritoParamsSchema } from './controllers/delete-favorito/delete-favorito-param.http-dto'
import { GetAllFavoritosQuerySchema } from './controllers/get-all-favoritos/get-all-favoritos-query.http-dto'
import { RegisterFavoritoParamsSchema } from './controllers/register-favorito/register-favorito-params.http-dto'

extendZodWithOpenApi(z)

// PUT /api/v1/favorito/upsert
registry.registerPath({
  method: 'put',
  path: '/api/v1/favorito/upsert',
  tags: ['Favorito'],
  summary: 'Registrar o actualizar favorito',
  description: 'Agrega un objeto SQL como favorito. Si ya existe, lo actualiza (upsert). Retorna 201 si se insertó, 200 si se actualizó.',
  security: [{ BearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: RegisterFavoritoParamsSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Favorito actualizado',
      content: { 'application/json': { schema: SuccessMessageResponseSchema } },
    },
    201: {
      description: 'Favorito creado',
      content: { 'application/json': { schema: SuccessMessageResponseSchema } },
    },
    ...errorResponses('UnauthorizedException', 'ValidationException'),
  },
})

// GET /api/v1/favorito
registry.registerPath({
  method: 'get',
  path: '/api/v1/favorito',
  tags: ['Favorito'],
  summary: 'Obtener favoritos del usuario',
  description: 'Lista los favoritos del usuario autenticado, filtrados por tipo y limitados por cantidad.',
  security: [{ BearerAuth: [] }],
  request: {
    query: GetAllFavoritosQuerySchema,
  },
  responses: {
    200: {
      description: 'Lista de favoritos',
      content: { 'application/json': { schema: SuccessListResponseSchema } },
    },
    ...errorResponses('UnauthorizedException', 'ValidationException'),
  },
})

// DELETE /api/v1/favorito/:id
registry.registerPath({
  method: 'delete',
  path: '/api/v1/favorito/{id}',
  tags: ['Favorito'],
  summary: 'Eliminar favorito',
  description: 'Elimina un favorito del usuario por su ID.',
  security: [{ BearerAuth: [] }],
  request: {
    params: DeleteFavoritoParamsSchema,
  },
  responses: {
    200: {
      description: 'Favorito eliminado',
      content: { 'application/json': { schema: DeleteResponseSchema } },
    },
    ...errorResponses('FavoritoNotFoundException', 'UnauthorizedException', 'ValidationException'),
  },
})
