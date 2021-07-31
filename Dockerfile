FROM node:alpine3.11

RUN apk add git bash

WORKDIR /app
COPY ./app .
RUN npm install
COPY ./entrypoint.sh /entrypoint.sh

EXPOSE 3000

RUN chmod +x /entrypoint.sh
CMD ["sh", "-c", "/entrypoint.sh"]
