FROM node:14.17.6-alpine as builder

WORKDIR /workspace
COPY ./ ./

RUN yarn install
RUN yarn workspace @posusume/graphql run build
RUN yarn workspace @posusume/api run build

FROM node:14.17.6-alpine as runner
WORKDIR /workspace

COPY --from=builder /workspace/package.json /workspace/yarn.lock /workspace/
COPY --from=builder /workspace/packages/graphql/package.json /workspace/packages/graphql/
COPY --from=builder /workspace/packages/graphql/lib/ /workspace/packages/graphql/lib/
COPY --from=builder /workspace/packages/api/package.json /workspace/packages/api/yarn.lock /workspace/packages/api/
COPY --from=builder /workspace/packages/api/build/ /workspace/packages/api/build/
COPY --from=builder /workspace/packages/graphql/schemas/ /workspace/packages/graphql/schemas/

RUN NODE_ENV=production yarn install

ENV PORT=8081
EXPOSE $PORT
CMD ["node", "/workspace/packages/api/build/src/index.js"]
