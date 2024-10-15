# Omnissiah

Omnissiah es una aplicación web para gestionar tareas de Quality Assurance, permite realizar consultas de definiciones SQL a una base de datos de pruebas y compararlos con la base de datos de pre-producción, permite obtener el diccionario de las tablas de usuario, etc. Esta aplicación está construida con Node.js y React.

## Características
- Login a una base de datos con tu usuario SQL (con soporte solo a SQL SERVER).
- Búsqueda de definiciones SQL (Procedimientos almacenados, vistas, funciones, etc).
- Comparación de definicioens SQL con una base de datos de alineación.
- Búsqueda de tablas de usuario y visualización de su diccionario.

## Configuración de variables de entorno
1. Crea un archivo `.env` en la raíz del proyecto y define las variables de entorno necesarias según `.env.sample`
```plaintext
BACKEND_PORT: Este es el puerto en el que se ejecuta el servidor del backend de la aplicación. Las solicitudes a la API se dirigirán a este puerto.

CLIENT_PORT: Este es el puerto en el que se ejecuta la aplicación del cliente (frontend).

DOMAIN: Esta variable especifica el dominio o la dirección IP del servidor donde se despliega la aplicación. Puede usarse para acceder a los servicios del backend y frontend desde otras máquinas en la misma red local
```

2. Configura las variables de entorno del servicio backend **api**. Consulta el `README.md` del backend para configurar sus variables de entorno. Ten en cuenta que para levantar la dockerización del proyecto, no es necesario configurar las variables de entorno **PORT** y **ALLOWED_ORIGIN**

## Como levantar
Ejecuta el siguiente comando para levantar el servicio
```
docker-compose up -d
```

Para detener el servicio ejecuta
```
docker-compose down
```

Ejecuta el siguiente comando para forzar la actualización del proyecto
```
docker-compose up -d --build
```

Ejecuta el siguiente comando para listar los contenedores en ejecución
```
docker-compose ps
```
