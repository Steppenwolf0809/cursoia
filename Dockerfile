# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy all package files
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/
COPY server/prisma ./server/prisma/

# Install all dependencies (workspaces)
RUN npm ci --ignore-scripts

# Copy source code
COPY server ./server
COPY client ./client

# Build frontend (with env vars)
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
RUN npm run build

# Generate Prisma client
RUN cd server && npx prisma@5.22.0 generate

# Production stage
FROM node:22-alpine

WORKDIR /app

# Copy server files
COPY --from=builder /app/server ./server

# Copy built frontend
COPY --from=builder /app/client/dist ./client/dist

# Copy node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Set environment
ENV NODE_ENV=production
ENV PORT=3001

# Expose port
EXPOSE 3001

# Start command
CMD sh -c "cd server && npx prisma@5.22.0 migrate deploy && node src/index.js"
