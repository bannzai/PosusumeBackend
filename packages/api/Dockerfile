FROM node:14.17.6-alpine as builder

WORKDIR /workspace
COPY ./ ./

RUN yarn install
RUN yarn workspace @posusume/shared run build
RUN yarn workspace @posusume/api run build

FROM node:14.17.6-alpine as runner
WORKDIR /workspace

COPY --from=builder /workspace/package.json /workspace/yarn.lock /workspace/
COPY --from=builder /workspace/packages/shared/package.json /workspace/packages/shared/
COPY --from=builder /workspace/packages/shared/lib/ /workspace/packages/shared/lib/
COPY --from=builder /workspace/packages/api/package.json /workspace/packages/api/yarn.lock /workspace/packages/api/
COPY --from=builder /workspace/packages/api/build/ /workspace/packages/api/build/
COPY --from=builder /workspace/packages/api/schemas/ /workspace/packages/api/schemas/

RUN NODE_ENV=production yarn install

ENV PORT=8081
EXPOSE $PORT
CMD ["node", "/workspace/packages/api/build/index.js"]
