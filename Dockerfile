FROM node:16-alpine

RUN apk add git bash

WORKDIR /app
COPY ./app/package.json .
RUN yarn

ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 5173
EXPOSE 3000

CMD ["yarn", "run", "dev"]
