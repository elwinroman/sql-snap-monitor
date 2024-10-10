FROM node:lts-alpine3.20

WORKDIR /app

COPY package*.json /app

RUN npm ci

COPY . /app

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview", "--", "--host"]