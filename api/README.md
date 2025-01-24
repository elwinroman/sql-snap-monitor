# Aplicación Backend

## Requisitos previos
- [Node.js](https://nodejs.org/) >= 20.0.18
- [npm](https://www.npmjs.com/) >= 10.5.0
- O cualquier otro gestor de paquetes compatible `pnpm`, `yarn`, `bun`

## Instalación
1. Navega al directorio e instala las dependencias
```bash
cd [nombre_del_proyecto]/api
```

2. Instala las dependencias
```bash
npm install
```


## Configuración de variables de entorno
Crea un archivo `.env` en la raíz del proyecto **api** (backend) y define las variables de entorno necesarias según el `.env.sample`
```plaintext
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
PORT: Puerto en el que se ejecutará el servidor. Si no se especifica, el valor predeterminado es 3000.
ALLOWED_ORIGIN: Dirección o dominio desde el cual se permiten solicitudes al servidor (origen permitido para CORS).
JWT_SECRET: Clave secreta utilizada para firmar y verificar tokens JWT (JSON Web Token).
SESSION_SECRET: Clave secreta para la gestión de sesiones en el servidor, utilizada para firmar las cookies de la sesión.
PASS_PHRASE: Clave utilizada para la encriptación de datos sensibles
```
**Nota:** La variable **ALLOWED_ORIGIN** debe contener la dirección y el puerto del servidor frontend. Generalmente, en modo desarrollo, el puerto es **5173**, mientras que en producción, es **4173**. Estos son los puertos predefinidos utilizados por **ViteJS**. Asegúrate de incluir la dirección correcta en la configuración. Si el proyecto frontend está expuesto y no se está ejecutando en **localhost**, asegúrate de actualizar la dirección en la variable **ALLOWED_ORIGIN** para reflejar la dirección pública correspondiente.

## Como Empezar

### Levantar aplicación en desarrollo
Ejecuta
```bash
npm run dev
```

### Levantar la aplicación en pre-producción
Ejecuta
```bash
npm run build
npm run start
```

### Exponer el puerto del servidor
Si se desea exponer el puerto de la aplicación y permitir conexiones desde direcciones externas, puedes iniciar el servidor utilizando el parámetro `--host`. Esto permite que el servidor escuche en una dirección IP específica o en todas las interfaces de red disponibles.

Esto aplica tanto en el modo desarrollo como pre-producción. Por ejemplo:
```bash
npm run dev -- --host
# o
npm run start -- --host
```

### Levantar la aplicación en producción con Docker
Ver [README.md](../README.md) de la raíz del repositorio


## Configuración y cambios del repositorio
Este documento detalla los cambios realizados en el proyecto, incluyendo configuraciones del editor, instalación de plugins en Visual Studio Code (VSCode), y otras configuraciones relevantes.

### Configuración del editor
Para garantizar que todos los colaboradores trabajen en un entorno consistente, se recomienda utilizar las siguientes configuraciones en [Visual Studio Code](https://code.visualstudio.com/). Las configuraciones de editor ya están incluidas en el repositorio, en la carpeta `.vscode > settings.json`, no es necesario realizar cambios adicionales.
```
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "typescript",
  ],
}
```

El formateador de código utilizado en el proyecto es **Prettier**, que garantiza un estilo consistente a lo largo del código. No es necesario instalar el plugin, ya que el proyecto está configurado para que **ESLint** use **Prettier** como formateador. Esto asegura que todos los estilos y formatos sean coherentes. Además, se incluye un formateador de importaciones y exportaciones para mejorar la organización del código. La configuración de las reglas para **ESLint** se encuentra en el archivo `eslint.config.js`

### Plugins necesarios de VSCode
1. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): Herramienta para identificar y reportar patrones en el código Typescript.


## Ejecución de pruebas unitarias