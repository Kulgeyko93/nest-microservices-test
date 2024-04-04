FROM node:20-alpine3.18

WORKDIR /opt/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build-gateway

CMD ["node", "dist/apps/gateway/main"]
