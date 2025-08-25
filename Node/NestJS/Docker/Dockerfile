# -------------------------
# Base image.
# Install stage
# -------------------------
FROM node:20.18.2-slim AS base

WORKDIR /usr/src/app
COPY package*.json ./

# -------------------------
# Build stage
# -------------------------
FROM base AS build

RUN npm ci --include=dev
COPY . .
RUN npm run build

# -- remove dev deps
RUN npm prune --omit=dev

# -------------------------
# Production stage
# -------------------------
FROM base AS production

ENV NODE_ENV=production

# -- Copy only production env [!IMPORTANT] SPECIAL ATTENTION
COPY --from=build /usr/src/app/.env.production .env

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

# -- Copy assets or public files that your code uses [!IMPORTANT] SPECIAL ATTENTION
COPY --from=build /usr/src/app/api-assets ./api-assets

# -- Create folders for volumes if you need to.
#RUN mkdir -p /opt/files-ascun

# -- Expose only the port that the app uses.
#EXPOSE 8000

CMD ["node", "dist/main"]
