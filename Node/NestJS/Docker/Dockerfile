FROM node:22.12.0-slim AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

#RUN mkdir /opt/files-ascun

RUN npm run build

FROM node:22.12.0-slim AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
#ARG TZ=UTC+5
#ENV TZ=UTC+5

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

#RUN mkdir /opt/files-ascun

CMD ["node", "dist/main"]
