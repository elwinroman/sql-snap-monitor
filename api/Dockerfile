FROM node:lts-alpine3.20

# RUN apk add --no-cache bash
RUN apk update && apk add --no-cache dumb-init

WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .
RUN npm run build && \
    npm prune --production

EXPOSE 3000

CMD ["dumb-init", "node", "dist/index.js", "--", "--host"]