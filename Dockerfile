FROM node:22-alpine

ENV APP_ROOT /web

WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN npm ci

RUN npm run build
CMD node .output/server/index.mjs