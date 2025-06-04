FROM node:18-alpine AS base

LABEL description="Frontend client for Kevin Portfolio Website"
LABEL maintainer="Yaspi Team"
LABEL version="1.0.0"

# Create user/group in base to reuse
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 reactowner

FROM base AS deps

COPY package*.json .
RUN npm ci

FROM base AS builder

COPY --from=deps /node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
RUN npm install -g serve


ENV NODE_ENV=production
COPY --from=builder /public ./public
COPY --from=builder /node_modules ./node_modules
COPY --from=builder /package.json ./package.json
COPY --from=builder --chown=reactowner:nodejs /build/ ./build/
USER reactowner
EXPOSE 3001
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1
CMD ["serve", "-s", "build"]