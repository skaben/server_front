FROM node:16-alpine

RUN apk add git bash

WORKDIR /app
COPY ./app/package.json /app/
RUN yarn

ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3000
