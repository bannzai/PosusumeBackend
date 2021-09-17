FROM node:14.17.6-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN NDDE_ENV=production yarn install

COPY src ./

ENTRYPOINT node start






