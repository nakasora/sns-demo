FROM node:17 AS build-stage

WORKDIR /usr/src/app/backend

RUN npm i -g pnpm

COPY pnpm-lock.yaml ./
COPY package-lock.json ./
COPY package.json ./

RUN rm -rf node_modules
RUN pnpm install
COPY . ./

EXPOSE 3000

CMD ["pnpm", "start"]