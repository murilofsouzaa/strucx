# Multi-Stage Dockerfile for StrucX Backend (Node.js + Express + TypeScript)

# Stage 1: Build Stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm ci

COPY src ./src
RUN npm run build

# Stage 2: Production Runtime Stage
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Create non-root system user
RUN addgroup -S strucxgroup && adduser -S strucxuser -G strucxgroup

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled JavaScript output from builder
COPY --from=builder /app/dist ./dist

# Create and set permissions for persistent leads storage directory
RUN mkdir -p /app/leads && chown -R strucxuser:strucxgroup /app

USER strucxuser

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/health || exit 1

CMD ["node", "dist/server.js"]
