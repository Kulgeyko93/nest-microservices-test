FROM node:20-alpine3.18

WORKDIR /opt/src/app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build-account

CMD ["node", "dist/apps/account/main"]
