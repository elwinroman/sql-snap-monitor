import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { registry } from '@core/swagger/openapi-registry'
import { DeleteResponseSchema, errorResponses, SuccessListResponseSchema } from '@core/swagger/schemas'
import { z } from 'zod'

import { DeleteBusquedaRecienteParamsSchema } from './delete-busqueda-reciente/delete-busqueda-reciente.http-dto'
import { GetAllBusquedaRecienteQuerySchema } from './get-all-busqueda-reciente/get-all-busqueda-reciente-query.http-dto'

extendZodWithOpenApi(z)

// GET /api/v1/busqueda-reciente
registry.registerPath({
  method: 'get',
  path: '/api/v1/busqueda-reciente',
  tags: ['Búsqueda Reciente'],
  summary: 'Obtener búsquedas recientes',
  description:
    'Lista las búsquedas recientes del usuario autenticado desde cache (Valkey). Filtradas por tipo de objeto SQL y limitadas por cantidad. Los datos tienen un TTL configurable y se eliminan automáticamente al expirar.',
  security: [{ BearerAuth: [] }],
  request: {
    query: GetAllBusquedaRecienteQuerySchema,
  },
  responses: {
    200: {
      description: 'Lista de búsquedas recientes',
      content: { 'application/json': { schema: SuccessListResponseSchema } },
    },
    ...errorResponses('UnauthorizedException', 'ValidationException'),
  },
})

// DELETE /api/v1/busqueda-reciente/:id
registry.registerPath({
  method: 'delete',
  path: '/api/v1/busqueda-reciente/{id}',
  tags: ['Búsqueda Reciente'],
  summary: 'Eliminar búsqueda reciente',
  description:
    'Elimina una búsqueda reciente por su ID (hash MD5 de 32 caracteres, generado a partir de userId + database + schema + objectName).',
  security: [{ BearerAuth: [] }],
  request: {
    params: DeleteBusquedaRecienteParamsSchema,
  },
  responses: {
    200: {
      description: 'Búsqueda reciente eliminada',
      content: { 'application/json': { schema: DeleteResponseSchema } },
    },
    ...errorResponses('BusquedaRecienteNotFoundException', 'UnauthorizedException', 'ValidationException'),
  },
})
