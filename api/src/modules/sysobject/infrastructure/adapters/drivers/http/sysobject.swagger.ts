import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { registry } from '@core/swagger/openapi-registry'
import { errorResponses, SuccessResponseSchema } from '@core/swagger/schemas'
import { z } from 'zod'

import { GetProdSysObjectParamsSchema } from './get-prod-sysobject/get-prod-sysobject.http-dto'
import { GetSysObjectParamsSchema } from './get-sysobject/get-sysobject.http-dto'
import { GetSysUsertableParamsSchema } from './get-sysusertable/get-sysusertable.http-dto'
import { SearchSuggestionQuerySchema } from './search-suggestions/search-suggestion.http-dto'

extendZodWithOpenApi(z)

// GET /api/v1/sysobject/search
registry.registerPath({
  method: 'get',
  path: '/api/v1/sysobject/search',
  tags: ['SysObject'],
  summary: 'Buscar sugerencias de objetos SQL',
  description: 'Busca objetos SQL Server por nombre parcial y tipo. Requiere autenticación.',
  security: [{ BearerAuth: [] }],
  request: {
    query: SearchSuggestionQuerySchema,
  },
  responses: {
    200: {
      description: 'Lista de sugerencias encontradas',
      content: { 'application/json': { schema: SuccessResponseSchema } },
    },
    ...errorResponses('UnauthorizedException', 'ValidationException'),
  },
})

// GET /api/v1/sysobject/prod
registry.registerPath({
  method: 'get',
  path: '/api/v1/sysobject/prod',
  tags: ['SysObject'],
  summary: 'Obtener objeto SQL de producción',
  description: 'Obtiene la definición de un objeto SQL desde el servidor de producción. No requiere autenticación obligatoria.',
  request: {
    query: GetProdSysObjectParamsSchema,
  },
  responses: {
    200: {
      description: 'Definición del objeto SQL de producción',
      content: { 'application/json': { schema: SuccessResponseSchema } },
    },
    ...errorResponses('ProdSysObjectNotFoundException', 'ValidationException'),
  },
})

// GET /api/v1/sysobject/:id
registry.registerPath({
  method: 'get',
  path: '/api/v1/sysobject/{id}',
  tags: ['SysObject'],
  summary: 'Obtener objeto SQL por ID',
  description: 'Obtiene la definición completa de un objeto SQL por su ID. Requiere autenticación.',
  security: [{ BearerAuth: [] }],
  request: {
    params: GetSysObjectParamsSchema,
  },
  responses: {
    200: {
      description: 'Definición del objeto SQL',
      content: { 'application/json': { schema: SuccessResponseSchema } },
    },
    ...errorResponses('SysObjectNotFoundException', 'UnauthorizedException', 'ValidationException'),
  },
})

// GET /api/v1/sysobject/usertable/:id
registry.registerPath({
  method: 'get',
  path: '/api/v1/sysobject/usertable/{id}',
  tags: ['SysObject'],
  summary: 'Obtener tabla de usuario por ID',
  description: 'Obtiene la estructura de una tabla de usuario (USER_TABLE) por su ID. Requiere autenticación.',
  security: [{ BearerAuth: [] }],
  request: {
    params: GetSysUsertableParamsSchema,
  },
  responses: {
    200: {
      description: 'Estructura de la tabla de usuario',
      content: { 'application/json': { schema: SuccessResponseSchema } },
    },
    ...errorResponses('SysObjectNotFoundException', 'UnauthorizedException', 'ValidationException'),
  },
})
