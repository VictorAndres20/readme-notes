##########################################################################
#
# !!!! IMPORTANT ----> UPDATE [nest-app] TO YOUR NX APP NAME <---- IMPORTANT !!!!
#
#         THIS SHOULD BE MOVED TO THE ROOT OF THE MONOREPO PROJECT
#                      Don't forget `.dockerignore`
# 
#                   You can create a `pre-build.sh` file
#                      at the root of nest application
#                   to execute on the server before build
#
# ```bash
# echo "Getting script dirname"
# SCRIPT_DIR=$(dirname "$0")
# sleep 1
# echo "Moving to script dir"
# cd "$SCRIPT_DIR" || exit
# sleep 1
# echo "Moving Docker files"
# cp Dockerfile ../../. && cp .dockerignore ../../.
# ```
#
#                      Then execute your build command
# 
#
#########################################################################

#########################################################################
# --- Stage 1: Base image for installing dependencies
FROM node:20.18.2-slim AS base

WORKDIR /usr/src/app

# --- Copy root dependency management files
COPY package.json package.json
COPY package-lock.json package-lock.json

#########################################################################
# --- Stage 2: Builder stage
# --- This stage will build the application.
FROM base AS builder

# --- Install all dependencies (including dev dependencies for the build)
RUN npm ci --include=dev

# --- Copy the entire monorepo source code
COPY . .

# --- Build the 'api' application in production mode with NX
RUN npx nx build [nest-app] --prod

# --- Prune dev dependencies
RUN npm prune --omit=dev

#########################################################################
# --- Stage 3: Production stage
# --- This stage will create the final, lean image.
FROM base AS production
ENV NODE_ENV=production

# --- Copy the build output from the builder stage
COPY --from=builder /usr/src/app/apps/[nest-app]/dist ./dist

# --- Copy node modules from builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules

# --- Set production env
COPY --from=builder /usr/src/app/apps/[nest-app]/.env.production .env

# --- Copy api assets
COPY --from=builder /usr/src/app/api-assets ./api-assets

# --- Create folders for volumes if you need to.
# RUN mkdir -p /opt/files-ascun

# --- Expose the port your application runs on.
# EXPOSE 8000

CMD ["node", "dist/main"]