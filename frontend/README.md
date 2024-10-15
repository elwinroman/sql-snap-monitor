# Aplicación Frontend

## Requisitos previos
- [Node.js](https://nodejs.org/) >= 20.0.18
- [npm](https://www.npmjs.com/) >= 10.5.0
- O cualquier otro gestor de paquetes compatible `pnpm`, `yarn`, `bun`

## Instalación
1. Navega al directorio e instala las dependencias
```bash
cd [nombre_del_proyecto]/frontend
```

2. Instala las dependencias
```bash
npm install
```


## Configuración de variables de entorno
Crea un archivo `.env` en la raíz del proyecto **frontend** (cliente) y define las variables de entorno necesarias según el `.env.sample`
```plaintext
VITE_API_URL: Dirección base de la API interna a la que el frontend enviará solicitudes. Asegúrate de configurarla correctamente para apuntar al entorno adecuado (desarrollo o producción)
```

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
npm run preview
```

### Exponer el puerto del servidor
Si se desea exponer el puerto de la aplicación y permitir conexiones desde direcciones externas, puedes iniciar el servidor utilizando el parámetro `--host`. Esto permite que el servidor escuche en una dirección IP específica o en todas las interfaces de red disponibles.

Esto aplica tanto en el modo desarrollo como pre-producción. Por ejemplo:
```bash
npm run dev -- --host
# o
npm run preview -- --host
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
    "source.fixAll.eslint": "explicit",
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

El formateador de código utilizado en el proyecto es **Prettier**, que garantiza un estilo consistente a lo largo del código. No es necesario instalar el plugin, ya que el proyecto está configurado para que **ESLint** use **Prettier** como formateador. Esto asegura que todos los estilos y formatos sean coherentes. Se incluye un formateador de importaciones y exportaciones para mejorar la organización del código, así como el formateo de las clases de estilos para **TailwindCSS**. La configuración de las reglas para **ESLint** se encuentra en el archivo `eslintrc.cjs`

### Plugins necesarios de VSCode
1. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): Herramienta para identificar y reportar patrones en el código Typescript.
2. [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss): Mejora la experiencia de desarrollo con Tailwind CSS al proporcionar autocompletado, sugerencias de clases y documentación en línea directamente en el editor. Ofrece una vista previa de las clases de utilidad, lo que facilita la creación de diseños responsivos y personalizados de manera más eficiente, reduciendo errores y mejorando la productividad.


## Ejecución de pruebas