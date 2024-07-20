## Introducción

## Instalación

## Requisitos

## Errores comunes

### ESOCKET (ConnectionError) - Socket error.
Cuando se intenta conectar a la base de datos SQL SERVER suele tener problemas de conexión con el siguiente error `ESOCKET (ConnectionError) - Socket error.`, para solucionar este error debe: 
1. Abrir Sql Server Configuration Manager
2. Habilitar el TCP de la instancia del servidor
3. Reiniciar el servidor

## API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | /api/causes | To retrieve all causes on the platform |
| GET | /api/causes/:causeId | To retrieve details of a single cause |
| PATCH | /api/causes/:causeId | To edit the details of a single cause |
| DELETE | /api/causes/:causeId | To delete a single cause |