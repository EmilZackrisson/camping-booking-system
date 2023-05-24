# Dockerfile

FROM node:16-alpine

RUN npm install -g pnpm

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["node", "build"]