FROM node:20.17.0-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY .env* ./

COPY . .

RUN yarn build

RUN yarn install --production

EXPOSE 3000

CMD ["yarn", "start"]