# Stage 1: Build the code
FROM node:18.17.0-alpine AS builder

# Install dependencies needed for building
RUN apk add --no-cache \
    build-base \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev \
    librsvg-dev

WORKDIR /app

# Copy only the necessary files to install dependencies first
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy remaining files
COPY . .

# Build the project
RUN yarn build

# Stage 2: Run the application
FROM node:18.17.0-alpine

WORKDIR /app

# Copy only the necessary files
COPY package.json yarn.lock ./

# Install production dependencies
RUN yarn install --production=true

# Copy the built application and necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/.env.local ./.env.local
COPY --from=builder /app/.env ./.env

# Expose the necessary port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]