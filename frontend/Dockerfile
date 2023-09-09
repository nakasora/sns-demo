FROM node:17 AS build-stage

WORKDIR /usr/src/app/frontend

COPY package.json ./
COPY package-lock.json ./

COPY . ./

RUN npm i vite
RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview"]