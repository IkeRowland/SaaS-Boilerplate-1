# Base node image
FROM node:20-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1

# Dependencies layer
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Builder layer
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set up output configuration for standalone mode
RUN echo '{ "output": "standalone" }' > next.config.js
RUN npm run build

# Runner layer
FROM base AS runner
ENV NODE_ENV production
ENV PORT 3000

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy necessary files
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"] 