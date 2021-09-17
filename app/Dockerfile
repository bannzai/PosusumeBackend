FROM node:14.17.6-alpine as builder
WORKDIR /app

COPY package.json yarn.lock ./
COPY tsconfig.json ./
RUN yarn install

COPY src /app/src
COPY schemas /app/schemas

RUN yarn run build

FROM node:14.17.6-alpine as runner
WORKDIR /app

COPY --from=builder /app/build /app/build
COPY package.json yarn.lock ./
COPY schemas /app/schemas

RUN NODE_ENV=production yarn install

ENV PORT=8081
EXPOSE $PORT
CMD ["node", "./build/index.js"]
