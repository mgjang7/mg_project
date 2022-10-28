FROM node:16.13.1-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn
RUN yarn build

CMD [ "yarn", "start" ]