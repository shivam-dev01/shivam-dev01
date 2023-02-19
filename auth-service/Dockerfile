FROM node:12.19.0-alpine3.9 as development

WORKDIR /usr

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development


COPY ./src ./src

COPY ./tsconfig.build.json .

COPY ./tsconfig.json .

COPY ./nest-cli.json .

RUN npm run build

FROM node:12.19.0-alpine3.9 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr

COPY package*.json ./

RUN npm install --only=production

COPY --from=development /usr/dist ./dist
