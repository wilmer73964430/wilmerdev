FROM node:18-alpine AS base
WORKDIR /app
COPY ../../package.json ../../pnpm-lock.yaml* ../../pnpm-workspace.yaml* ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY ../.. .
RUN pnpm build --filter admin...

FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app/apps/admin/.next ./.next
COPY --from=base /app/apps/admin/package.json ./package.json
COPY --from=base /app/node_modules ./node_modules
EXPOSE 3000
CMD ["pnpm", "start", "--filter", "admin"]
