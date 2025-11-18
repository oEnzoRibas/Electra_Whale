# Dockerfile for notification Service (Node.js)

# BUILD

FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
RUN npm install
COPY . ./
RUN npm run build

# PRODUCTION
FROM node:20-alpine AS production
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3003
CMD ["node", "dist/index.js"]