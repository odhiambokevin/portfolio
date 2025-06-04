FROM node:18-alpine AS base

LABEL description="Frontend client for Kevin Portfolio Website"
LABEL maintainer="Yaspi Team"
LABEL version="1.0.0"

# Create user/group in base to reuse
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 reactowner

FROM base AS deps
WORKDIR /frontend
COPY package*.json .
RUN npm ci

FROM base AS builder
WORKDIR /frontend
COPY --from=deps /frontend/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /frontend
ENV NODE_ENV=production
COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/node_modules ./node_modules
COPY --from=builder /frontend/package.json ./package.json
COPY --from=builder --chown=reactowner:nodejs /frontend/build/ ./build/
USER reactowner
EXPOSE 3001
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/ || exit 1
CMD ["npm", "start"]