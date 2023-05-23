FROM node:18.16.0-alpine AS base
RUN apk add --no-cache libc6-compat
RUN npm i -g @nestjs/cli
RUN npm i -g turbo
RUN npm i -g pnpm

FROM base as prunner
WORKDIR /app
COPY . .
RUN turbo prune --scope=@app/backend --docker

FROM base AS builder
WORKDIR /app
COPY --from=prunner /app/out/json/ .
COPY --from=prunner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=prunner /app/tsconfig.json .
RUN pnpm install --frozen-lockfile --prod
COPY --from=prunner /app/out/full/ .
RUN turbo run build --filter=@app/backend

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 runner
USER runner
COPY --from=builder --chown=runner:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=runner:nodejs /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=builder --chown=runner:nodejs /app/apps/backend/dist ./apps/backend/dist
EXPOSE 4000
CMD ["node", "apps/backend/dist/main.js"]
