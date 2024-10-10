FROM node:lts-alpine3.20 AS base

WORKDIR /app


FROM base AS build

RUN apk update && apk add --no-cache dumb-init

COPY package*.json /app

RUN npm ci

COPY tsconfig*.json /app
COPY .swcrc /app
COPY src /app/src

RUN npm run build && \
    npm prune --production


FROM base AS release

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json

EXPOSE 3000

CMD ["dumb-init", "node", "dist/index.js", "--", "--host"]