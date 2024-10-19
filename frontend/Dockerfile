# Use the specified Node.js version as the base image
FROM node:18.17.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to leverage Docker cache
COPY package.json yarn.lock ./

# Install dependencies (production only)
RUN yarn install --production

# Copy all project files to the working directory
COPY . .

# Build the Next.js application
RUN yarn build

# Expose port 3000 for the application
EXPOSE 3000

# COPY .env AND .env.local files
COPY .env* ./

# Command to start the Next.js application
CMD ["yarn", "start"]