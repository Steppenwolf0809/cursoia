# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/

# Install dependencies
RUN npm ci
RUN cd server && npm ci

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Generate Prisma client
RUN cd server && npx prisma generate

# Production stage
FROM node:22-alpine

WORKDIR /app

# Copy built frontend
COPY --from=builder /app/client/dist ./client/dist

# Copy server files
COPY --from=builder /app/server ./server
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Set environment
ENV NODE_ENV=production
ENV PORT=3001

# Expose port
EXPOSE 3001

# Start command
CMD ["sh", "-c", "cd server && npx prisma migrate deploy && node src/index.js"]
