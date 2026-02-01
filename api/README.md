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
PREPROD_DBUSERNAME: Nombre de usuario (en producción debe estar encriptado).
PREPROD_DBPASSWORD: Contraseña correspondiente al usuario (en producción debe estar encriptado).

# Configuración de base de datos (BD de la aplicación)
DBSERVER: Nombre del servidor.
DBNAME: Nombre de la base de datos.
DBUSERNAME: Nombre de usuario (en producción debe estar encriptado).
DBPASSWORD: Contraseña correspondiente al usuario (en producción debe estar encriptado).

# Configuración del servidor backend
ALLOWED_ORIGINS: Lista de orígenes permitidos (CORS), separados por comas.
JWT_SECRET: Clave secreta para firmar/verificar tokens JWT.
SESSION_SECRET: Clave secreta para firmar cookies de sesión.
PASS_PHRASE: Clave utilizada para la encriptación de datos sensibles.

# Reporte de errores con Sentry
SENTRY_REPORTING_ENABLED: Habilita o deshabilita el envío de errores a Sentry (true o false).
SENTRY_DSN: URL de conexión DSN proporcionada por Sentry para el proyecto.
```
**Nota:** La variable **ALLOWED_ORIGIN** debe contener la dirección y/o puerto del servidor frontend. Si esta trabajando en modo `development`, se permite automáticamente **localhost**. En modo `producction` **ALLOWED_ORIGIN** debe especificarse manualmente qué dominios están permitidos.

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


## CLI de Criptografía

Herramienta de línea de comandos para encriptar y desencriptar credenciales de forma segura usando el algoritmo AES-256-GCM. Útil para generar valores encriptados que se usan en las variables de entorno de producción.

### Uso de la CLI

Para iniciar la herramienta interactiva, ejecuta:
```bash
npm run cli:crypto
```

La CLI te presentará un menú interactivo con las siguientes opciones:
- **🔒 Encriptar texto**: Convierte texto plano a texto encriptado
- **🔓 Desencriptar texto**: Convierte texto encriptado a texto plano
- **👋 Salir**: Cierra la aplicación

### Ejemplo de uso

```bash
$ npm run cli:crypto

🔐 CLI de Criptografía - CryptoCode
Encripta y desencripta credenciales de forma segura

? ¿Qué operación deseas realizar? 🔒 Encriptar texto
? Ingresa el texto a encriptar: mi-password-super-secreto

✓ Resultado:
AsDf123*AsDf123*AsDf123*AsDf123

? ¿Deseas realizar otra operación? Yes
? ¿Qué operación deseas realizar? 🔓 Desencriptar texto
? Ingresa el texto a desencriptar: AsDf123*AsDf123*AsDf123*AsDf123

✓ Resultado:
mi-password-super-secreto

? ¿Deseas realizar otra operación? No

👋 ¡Hasta luego!
```

### Casos de uso comunes

1. **Encriptar credenciales de base de datos para producción**:
   - Ejecuta `npm run cli:crypto`
   - Selecciona "Encriptar texto"
   - Ingresa la contraseña real
   - Copia el resultado encriptado al archivo `.env` de producción

2. **Verificar credenciales encriptadas**:
   - Ejecuta `npm run cli:crypto`
   - Selecciona "Desencriptar texto"
   - Ingresa el valor encriptado del `.env`
   - Verifica que coincida con la credencial esperada

### Arquitectura de la CLI

La CLI está implementada siguiendo **arquitectura hexagonal** (Ports & Adapters):

```
src/modules/cli-crypto/
├── domain/              # Reglas de negocio
│   ├── ports/          # Interfaces (contratos)
│   └── schemas/        # Validaciones con Zod
├── application/        # Casos de uso
│   └── use-cases/
├── infrastructure/     # Detalles técnicos
    ├── adapters/       # Implementaciones concretas
    └── cli.entrypoint.ts
```

### Notas importantes

- La CLI usa la variable de entorno `PASS_PHRASE` definida en el archivo `.env`
- Asegúrate de tener el archivo `.env` configurado antes de usar la CLI
- El algoritmo de encriptación es AES-256-GCM (mismo que usa CryptoCode de Python)


## Configuración y cambios del repositorio
Este documento detalla los cambios realizados en el proyecto, incluyendo configuraciones del editor, instalación de plugins en Visual Studio Code (VSCode), y otras configuraciones relevantes.

### Configuración del editor
Para garantizar que todos los colaboradores trabajen en un entorno consistente, se recomienda utilizar las siguientes configuraciones en [Visual Studio Code](https://code.visualstudio.com/). Las configuraciones de editor ya están incluidas en el repositorio, en la carpeta `.vscode > settings.json`, no es necesario realizar cambios adicionales.
```json
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

[Vitest](https://vitest.dev/guide/)

Comando básico para ver en modo --watch los test
```bash
npm run test
```

Ejemplo de salida usando el reporter básico
```bash
✓ __tests__/file1.test.ts (2) 725ms
✓ __tests__/file2.test.ts (2) 746ms

 Test Files  2 passed (2)
      Tests  4 passed (4)
   Start at  12:34:32
   Duration  1.26s (transform 35ms, setup 1ms, collect 90ms, tests 1.47s, environment 0ms, prepare 267ms)
```

Para un reporte detallado que muestra cada prueba individual una vez finalizado el suite, ejecute:
 ```bash
npm run test --reporte=verbose
```
Ejemplo de salida usando el reporter detallado
```bash
✓ __tests__/file1.test.ts (2) 725ms
   ✓ first test file (2) 725ms
     ✓ 2 + 2 should equal 4
     ✓ 4 - 2 should equal 2
✓ __tests__/file2.test.ts (2) 746ms
  ✓ second test file (2) 746ms
    ✓ 1 + 1 should equal 2
    ✓ 2 - 1 should equal 1

 Test Files  2 passed (2)
      Tests  4 passed (4)
   Start at  12:34:32
   Duration  1.26s (transform 35ms, setup 1ms, collect 90ms, tests 1.47s, environment 0ms, prepare 267ms)
```
