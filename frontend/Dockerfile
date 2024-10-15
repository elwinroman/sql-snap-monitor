FROM node:lts-alpine3.20 AS build

# Define un argumento que se pasará durante la construcción
ARG VITE_API_URL=PRODUCTION_API_URL

WORKDIR /app
COPY package*.json /app
RUN npm ci
COPY . /app
RUN echo "VITE_API_URL=${VITE_API_URL}" >> .env
RUN npm run build

FROM nginx:alpine3.20-slim
COPY --from=build /app/dist /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh