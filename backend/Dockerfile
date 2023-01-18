FROM node:16-alpine As development

ARG CI_USER
ARG CI_PASSWORD

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache openssh-client

RUN npm install -g npm && npm install

COPY . .

RUN npm run build

FROM node:16-alpine as production

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache openssh-client

RUN npm install -g npm && npm install

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 8000

CMD ["node", "dist/src/main"]
