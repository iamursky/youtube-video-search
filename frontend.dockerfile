FROM node:18.16.0-alpine AS base
RUN apk add --no-cache libc6-compat
RUN npm i -g turbo
RUN npm i -g pnpm

FROM base as prunner
WORKDIR /app
COPY . .
RUN turbo prune --scope=@app/frontend --docker

FROM base AS builder
WORKDIR /app
COPY --from=prunner /app/out/json/ .
COPY --from=prunner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=prunner /app/tsconfig.json .
RUN pnpm install --frozen-lockfile --prod
COPY --from=prunner /app/out/full/ .
RUN turbo run build --filter=@app/frontend

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 runner
USER runner
COPY --from=builder /app/apps/frontend/next.config.js .
COPY --from=builder --chown=runner:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=builder --chown=runner:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static
EXPOSE 3000
CMD ["node", "apps/frontend/server.js"]
