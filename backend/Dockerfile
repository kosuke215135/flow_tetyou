# --- ステージ 1: ビルド環境 ---
FROM node:18-alpine AS builder

WORKDIR /app/backend

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# --- ステージ 2: 本番環境 ---
FROM node:18-alpine

WORKDIR /app/backend

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/backend/dist ./dist

EXPOSE 4000

CMD [ "node", "dist/index.js" ]