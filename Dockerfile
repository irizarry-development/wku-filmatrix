FROM node:20

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN npx prisma generate
RUN pnpm run build

CMD [ "pnpm", "start" ]

EXPOSE 3000
