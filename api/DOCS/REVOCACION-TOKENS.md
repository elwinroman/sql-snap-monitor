# Revocación de Tokens Comprometidos

## Contexto

El sistema usa una blacklist basada en Redis para invalidar tokens JWT. Anteriormente no se registraban los JTI de los tokens generados, pero con la integración de **Grafana Loki**, cada request autenticado loguea el `jti`, `type` y `expirationCountdown` como parte del contexto de sesión ([logger-context.ts:23-28](../src/modules/shared/infrastructure/logger/logger-context.ts#L23-L28)), lo que permite rastrear y auditar tokens activos.

## Arquitectura actual

### Generación de tokens
- Cada token tiene un `jti` (JWT ID) único generado con `randomUUID()`
- El `jti` se loguea en cada request autenticado a través del `LoggerRequestContext.session` y se envía a Grafana Loki
- El middleware `verifyTokenMiddleware` inyecta el contexto de sesión (`jti`, `type`, `expirationCountdown`) en el logger ([verify-token.middleware.ts](../src/modules/shared/infrastructure/middlewares/verify-token.middleware.ts))

### Blacklist
- **Key:** `blacklist:{jti}`
- **Value:** `{"type":"access|refresh","jti":"...","user_id":...}`
- **TTL:** Segundos restantes hasta expiración del token

### Mecanismo de invalidación automática
Los tokens se agregan a la blacklist automáticamente en dos casos:

1. **Logout normal:** Usuario cierra sesión ([logout.use-case.ts:17-26](../src/modules/auth/application/use-cases/logout.use-case.ts#L17-L26))
2. **Credenciales no encontradas:** Cuando Redis pierde las credenciales ([verify-access-token.use-case.ts:33-37](../src/modules/auth/application/use-cases/verify-access-token.use-case.ts#L33-L37))

## Solución para revocar tokens comprometidos

### Opción 1: Revocación por JTI desde Grafana Loki (RECOMENDADA si Loki está habilitado)

Si se tiene acceso a Grafana Loki, se puede obtener el `jti` de cualquier sesión activa sin necesidad de tener el token.

#### Paso 1: Buscar el JTI en Grafana (Explore > Loki)
```logql
{app="quality-tools-api"} | json | session_jti != "" | line_format "user={{.user_userId}} jti={{.session_jti}} type={{.session_type}}"
```

Para filtrar por usuario específico:
```logql
{app="quality-tools-api"} | json | user_userId = "123"
```

#### Paso 2: Extraer el JTI del log y calcular TTL
El campo `session_expirationCountdown` indica los segundos restantes **al momento del request**. Calcular el TTL actual:
```bash
# TTL actual ≈ expirationCountdown - (ahora - timestamp_del_log)
```

#### Paso 3: Agregar a blacklist
```bash
redis-cli SET "blacklist:{jti}" '{"type":"access_token","jti":"{jti}","user_id":{user_id}}' EX {ttl}
```

### Opción 2: Revocación manual por JTI (requiere el token)

Si se dispone del token comprometido:

#### Paso 1: Decodificar el token
```bash
# Usando Node.js
node -e "console.log(JSON.stringify(require('jsonwebtoken').decode('TOKEN_AQUI'), null, 2))"
```

O utilizar [jwt.io](https://jwt.io) para decodificar el token.

#### Paso 2: Extraer datos
```json
{
  "jti": "a1b2c3d4-...",
  "type": "access",
  "user_id": 123,
  "exp": 1738368000
}
```

#### Paso 3: Calcular TTL
```javascript
const ahora = Math.floor(Date.now() / 1000)
const ttl = decoded.exp - ahora
```

#### Paso 4: Agregar a blacklist
```bash
redis-cli SET "blacklist:{jti}" '{"type":"access","jti":"{jti}","user_id":{user_id}}' EX {ttl}
```

**Ejemplo real:**
```bash
redis-cli SET "blacklist:a1b2c3d4-5678-90ab-cdef-123456789abc" '{"type":"access","jti":"a1b2c3d4-5678-90ab-cdef-123456789abc","user_id":123}' EX 3600
```

### Opción 3: Revocación nuclear (SIN el token ni Loki)

Si no se dispone del token pero se conoce el usuario afectado:

#### Paso 1: Obtener user_id
```sql
SELECT id, user, aliasHost FROM users WHERE user = 'nombre_usuario';
-- O por host
SELECT id, user, aliasHost FROM users WHERE aliasHost = 'SERVER01';
```

#### Paso 2: Eliminar credenciales de cache
```bash
redis-cli DEL "auth:credentials:{user_id}"
```

**Ejemplo:**
```bash
redis-cli DEL "auth:credentials:123"
```

#### Resultado
- El próximo request con CUALQUIER token de ese usuario falla
- El sistema automáticamente invalida el token ([verify-access-token.use-case.ts:30-39](../src/modules/auth/application/use-cases/verify-access-token.use-case.ts#L30-L39))
- Se agrega a la blacklist automáticamente
- Se loguea la tentativa

**Ventajas:**
- No requiere el token
- Implementación inmediata
- Invalida todos los tokens (access + refresh)
- No requiere cambios en el código

**Desventajas:**
- Revoca todas las sesiones del usuario (web, mobile, etc.)
- El usuario debe autenticarse nuevamente en todos los dispositivos

## Comunicación al usuario

"Se han revocado todas las sesiones activas por seguridad. Es necesario volver a autenticarse en todos los dispositivos."

## Verificación

Para verificar que un token se encuentra en la blacklist:

```bash
redis-cli GET "blacklist:{jti}"
```

Si devuelve un valor, el token ha sido revocado.

## Limitaciones actuales

1. **No hay auditoría de revocación:** Se registra el uso de tokens (via Loki), pero no quién ejecutó la revocación manual en Redis
2. **No hay revocación selectiva desde la app:** La revocación por JTI requiere acceso a Grafana + Redis (no hay endpoint administrativo)

## Mejoras resueltas con Grafana Loki

Con la integración de pino-loki (`LOKI_REPORTING_ENABLED=true`), se resolvieron las siguientes limitaciones:

1. **Auditoría de sesiones:** Cada request autenticado loguea `jti`, `type`, `expirationCountdown`, `userId` y `role`
2. **Listado de sesiones activas:** Se puede consultar en Grafana qué tokens usó un usuario y cuándo
3. **Revocación selectiva:** Se puede obtener el `jti` de una sesión específica desde Loki sin necesidad del token

## Mejoras futuras (opcional)

Si el proyecto crece, se recomienda implementar:

1. **Endpoint administrativo** `/admin/revoke-token` para revocar sin acceso directo a Redis
2. **Logs de auditoría de revocación** para registrar quién revocó qué
3. **Panel de gestión** para que los usuarios consulten y revoquen sus propias sesiones

---

**Última actualización:** 2026-02-01
