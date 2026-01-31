# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy all files first
COPY . .

# Install root dependencies
RUN npm ci --ignore-scripts

# Install server dependencies (ignore scripts to avoid prisma issues)
RUN cd server && npm ci --ignore-scripts

# Install client dependencies
RUN cd client && npm ci --ignore-scripts

# Build frontend
RUN npm run build

# Generate Prisma client
RUN cd server && ./node_modules/.bin/prisma generate

# Production stage
FROM node:22-alpine

WORKDIR /app

# Copy built frontend
COPY --from=builder /app/client/dist ./client/dist

# Copy server files
COPY --from=builder /app/server ./server

# Copy node_modules (root and server)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server/node_modules ./server/node_modules
COPY --from=builder /app/package*.json ./

# Set environment
ENV NODE_ENV=production
ENV PORT=3001

# Expose port
EXPOSE 3001

# Start command
CMD ["sh", "-c", "cd server && ./node_modules/.bin/prisma migrate deploy && node src/index.js"]
