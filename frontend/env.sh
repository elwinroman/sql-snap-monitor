#!/bin/sh
CONSTANT="PRODUCTION_API_URL"
value=${VITE_API_URL}
echo "Reemplazando $CONSTANT por $value en archivos .js y .css"
# Reemplazar la constante en todos los archivos .js y .css
find /usr/share/nginx/html -type f \( -name '*.js' -o -name '*.css' \) -exec sed -i "s|$CONSTANT|$value|g" '{}' +