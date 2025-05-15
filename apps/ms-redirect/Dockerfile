FROM node:20-slim

WORKDIR /app

COPY . .

WORKDIR /app/apps/ms-redirect

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install

EXPOSE 3001

CMD ["pnpm", "run", "dev"]
