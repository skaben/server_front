FROM node:alpine3.11

RUN apk add git bash

WORKDIR /app
RUN npm i -g webpack webpack-dev-server webpack-cli
RUN npm i -g @babel/cli @babel/core @babel/preset-env babel-loader
RUN npm i -g html-webpack-plugin vue-loader vue-template-compiler css-loader vue-style-loader
RUN npm i -g @vue/cli

COPY ./entrypoint.sh /entrypoint.sh

EXPOSE 3000

CMD ["sh", "-c", "/entrypoint.sh"]
