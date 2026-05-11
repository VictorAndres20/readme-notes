#########################################################################
#########################################################################
# Stage 1: Builder stage
FROM node:24.11.0-slim AS builder
WORKDIR /usr/src/app

# Copy dependency files
COPY package.json package-lock.json ./

# Install all dependencies (dev deps needed for tsc/nest build)
RUN npm ci

# Copy source code
COPY . .

# Build the NestJS application
RUN npm run build

#########################################################################
#########################################################################
# Stage 2: Production stage
FROM node:24.11.0-slim AS production
WORKDIR /usr/src/app
ENV NODE_ENV=production

# Copy dependency files
COPY package.json package-lock.json ./

# Install only production dependencies using exact locked versions
RUN npm ci --omit=dev

# Copy build output from builder
COPY --from=builder /usr/src/app/dist ./dist

# Set production env
COPY --from=builder /usr/src/app/.env.production .env

# Copy api assets
COPY --from=builder /usr/src/app/api-assets ./api-assets

# EXPOSE 8000

CMD ["node", "dist/main"]
