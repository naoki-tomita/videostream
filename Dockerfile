FROM node:alpine
RUN apk update && \ 
    apk add yarn;
WORKDIR /work
COPY ./yarn.lock ./package.json /work/
# for node-gyp
RUN apk add --no-cache make gcc g++ python && \
    yarn && \
    yarn cache clean && \
    apk del make gcc g++ python
COPY . /work
