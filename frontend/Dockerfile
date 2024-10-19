# Stage 1: Building the code
FROM node:18.17.0-alpine AS builder

RUN apk add --no-cache \
    build-base \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev \
    librsvg-dev

WORKDIR /app

COPY package*.json ./
COPY .env.local ./
COPY .env ./
COPY next.config.js ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Run the application
FROM node:18.17.0-alpine

WORKDIR /app

COPY package*.json ./
COPY --from=builder /app/.env.local ./.env.local
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/next.config.js ./next.config.js

RUN npm install --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
