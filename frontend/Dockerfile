FROM node:18-alpine AS base

LABEL description="Frontend client for Kevin Portfolio Website"
LABEL maintainer="Yaspi Team"
LABEL version="1.0.0"

# Create user/group in base to reuse
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 reactowner

FROM base AS deps
RUN mkdir /app
WORKDIR /app
COPY package*.json .
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY . .
# RUN npm install
RUN npm run build

FROM base AS runner
WORKDIR /app
RUN npm install -g serve


ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=reactowner:nodejs /app/build/ ./build/
USER reactowner
EXPOSE 3001
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1
CMD ["serve", "-s", "build"]