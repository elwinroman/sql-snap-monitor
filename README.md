# Sql Snap Monitor

Es una aplicación web para gestionar tareas de Quality Assurance, permite realizar consultas de definiciones SQL a una base de datos de pruebas y compararlos con la base de datos de pre-producción, permite obtener el diccionario de las tablas de usuario, etc. Esta aplicación está construida con Node.js y React.

## Características
- Login a una base de datos con tu usuario SQL (con soporte solo a SQL SERVER).
- Búsqueda de definiciones SQL (Procedimientos almacenados, vistas, funciones, etc).
- Comparación de definicioens SQL con una base de datos de alineación.
- Búsqueda de tablas de usuario y visualización de su diccionario.

## Configuración de variables de entorno
1. Crea un archivo `.env` en la raíz del proyecto y define las variables de entorno necesarias según `.env.sample`
```plaintext
# Configuración general
BACKEND_PORT: Este es el puerto en el que se ejecuta el servidor del backend de la aplicación. Las solicitudes a la API se dirigirán a este puerto.
CLIENT_PORT: Este es el puerto en el que se ejecuta la aplicación del cliente (frontend).
DOMAIN: Esta variable especifica el dominio o la dirección IP del servidor donde se despliega la aplicación (por defecto es el ALLOWED_ORIGIN), si se quiere agregar varios dominios a la lista de dominios permitidos, agregar la variable ALLOWED_ORIGINS=dominio01,dominio02,etc

# Configuración de base de datos (BD de alineación - PREPROD)
PREPROD_DBSERVER: Nombre del servidor.
PREPROD_DBNAME: Nombre de la base de datos.
PREPROD_DBUSERNAME: Nombre de usuario encriptado.
PREPROD_DBPASSWORD: Contraseña correspondiente al usuario encriptado.

# Configuración de base de datos (BD de la aplicación)
DBSERVER: Nombre del servidor.
DBNAME: Nombre de la base de datos.
DBUSERNAME: Nombre de usuario encriptado.
DBPASSWORD: Contraseña correspondiente al usuario encriptado.

# Configuración del servidor backend
NODE_ENV: Entorno en el que se ejecuta la aplicacion.
ALLOWED_ORIGINS: Lista de dominio/s (separado por comas) desde el cual se permiten solicitudes al servidor (origen permitido para CORS).
JWT_SECRET: Clave secreta utilizada para firmar y verificar tokens JWT (JSON Web Token).
SESSION_SECRET: Clave secreta para la gestión de sesiones en el servidor, utilizada para firmar las cookies de la sesión.
PASS_PHRASE: Clave utilizada para la encriptación de datos sensibles
```

2. Configura las variables de entorno dentro de `docker-compose.yml` del servicio backend **api**. Consulta el `README.md` del backend para configurar sus variables de entorno. Ten en cuenta que para levantar la dockerización del proyecto, no es necesario configurar las variables de entorno **PORT** y **ALLOWED_ORIGIN**

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

## Errores al ejecutar
Cuando un archivo **env.sh** es creado o editado en un sistema Windows, el editor de texto puede agregar automáticamente terminaciones de línea CRLF. Sin embargo, los scripts de shell en entornos Unix/Linux esperan terminaciones de línea LF, lo que puede causar errores de ejecución o interpretaciones incorrectas del script. Para verificar si un archivo env.sh tiene terminaciones CRLF, puedes usar el siguiente comando en la terminal:
```
file env.sh
```
Si el resultado indica "CRLF line terminators", significa que el archivo tiene terminaciones de línea de Windows.

Para solucionar este problema y convertir el archivo **env.sh** a terminaciones de línea LF, puedes realizar lo siguiente:
```
cd frontend
dos2unix env.sh
```
Este comando convierte el archivo a terminaciones de línea LF.

**Actualización 26/12/2024 (Fixed):** Se ha solucionado el error usando `dos2unix` en el Dockerfile (frontend)