# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/
COPY server/prisma ./server/prisma/

# Install root dependencies (workspaces)
RUN npm ci --ignore-scripts

# Copy server source
COPY server ./server

# Generate Prisma client
RUN cd server && npx prisma@5.22.0 generate

# Production stage
FROM node:22-alpine

WORKDIR /app

# Copy server files
COPY --from=builder /app/server ./server

# Copy node_modules (root - incluye deps del server por workspaces)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Set environment
ENV NODE_ENV=production
ENV PORT=3001

# Expose port
EXPOSE 3001

# Start command
CMD ["sh", "-c", "cd server && npx prisma@5.22.0 migrate deploy && node src/index.js"]
