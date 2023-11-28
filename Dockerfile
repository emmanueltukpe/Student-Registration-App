FROM node:20-alpine3.17


WORKDIR /app

COPY package.json yarn.lock ./

RUN apk add --no-cache make gcc g++ python

RUN yarn

COPY . .

FROM node:20-alpine3.17

WORKDIR /app

COPY --from=Base /app .

RUN yarn build:tsc

CMD [ "yarn", "start" ]