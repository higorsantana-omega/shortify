FROM node:20-slim

WORKDIR /app

COPY . .

WORKDIR /app/apps/ms-api

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
