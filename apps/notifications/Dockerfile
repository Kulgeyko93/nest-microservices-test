FROM node:20-alpine3.18 as development

WORKDIR /opt/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build-notifications

FROM node:20-alpine3.18 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY --from=development opt/src/app/dist ./dist

CMD ["node", "dist/apps/notifications/main"]
