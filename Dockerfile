# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy all files first
COPY . .

# Install root dependencies (esto instala todo incluyendo server y client por los workspaces)
RUN npm ci --ignore-scripts

# Build frontend
RUN npm run build

# Generate Prisma client
RUN cd server && npx prisma@5.22.0 generate

# Production stage
FROM node:22-alpine

WORKDIR /app

# Copy built frontend
COPY --from=builder /app/client/dist ./client/dist

# Copy server files
COPY --from=builder /app/server ./server

# Copy node_modules (root only - las dependencias del server están aquí por workspaces)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Set environment
ENV NODE_ENV=production
ENV PORT=3001

# Expose port
EXPOSE 3001

# Start command
CMD ["sh", "-c", "cd server && npx prisma@5.22.0 migrate deploy && node src/index.js"]
