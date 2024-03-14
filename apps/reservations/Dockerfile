FROM node:alpine as development

WORKDIR /opt/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build-reservations

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY --from=development opt/src/app/dist ./dist

CMD ["node", "dist/apps/reservations/main"]
