# Build multi-stage: a imagem final leva só o standalone do Next, sem toolchain
# nem devDependencies.
FROM node:22-alpine AS deps
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS=--max-old-space-size=1536
RUN pnpm build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# Onde o /admin grava. Montado como volume no compose, sobrevive a rebuild.
ENV CONTENT_DIR=/app/data/content

COPY --from=builder /app/public ./public
# Cópia versionada do conteúdo: serve de fallback de leitura quando um JSON
# ainda não existe no volume (primeiro deploy, ou arquivo novo vindo no código).
COPY --from=builder /app/content ./content
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN mkdir -p /app/data/content
EXPOSE 3000
CMD ["node", "server.js"]
