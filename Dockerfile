# 1. Build Stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install ALL dependencies (including devDependencies for TypeScript build)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the TypeScript project to /dist
RUN npm run build

# 2. Production Stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Set Node environment to production
ENV NODE_ENV=production

# Copy package.json and package-lock.json
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --only=production

# Copy the built JavaScript files from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port your server runs on (defaults to 3000/7000)
EXPOSE 7000

# Start the application
CMD ["npm", "start"]
