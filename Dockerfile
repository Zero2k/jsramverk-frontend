# Stage 1 - Build client
FROM node as client
WORKDIR /usr/app/client
RUN mkdir -p /usr/app/client
COPY client/package*.json ./
RUN npm install
COPY ./client .
RUN npm run build

# Stage 2 - Build server
FROM node as server
WORKDIR /usr/app/server
COPY server/package*.json ./
RUN npm install
COPY ./server .
RUN npm run build

# Stage 3 - Install dependencies
FROM node
WORKDIR /usr/app/server
COPY server/package*.json ./
RUN npm install --production

COPY --from=client /usr/app/client/build ./client/build
COPY --from=server /usr/app/server/dist ./dist

COPY server/ormconfig.dokku.json ./ormconfig.json
COPY server/.env .

ENV NODE_ENV production

EXPOSE 4000
CMD node dist/index.js
