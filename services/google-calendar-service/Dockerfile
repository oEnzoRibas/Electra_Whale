# Dockerfile for google-calendar-integration Service (Node.js)

FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
# RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/package.json ./
RUN npm install --omit=dev
COPY --from=builder /app .

EXPOSE 3004

CMD [ "node", "index.js" ]