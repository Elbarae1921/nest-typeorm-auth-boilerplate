FROM node:15-alpine as build
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

# stage to install only production deps
FROM node:15-alpine as deps
WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
COPY yarn.lock ./
RUN yarn --prod

## this is stage two, where the app actually runs
FROM node:15-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
COPY yarn.lock ./
COPY --from=build /app/dist ./dist/
COPY --from=deps /app/node_modules ./node_modules/
RUN ls -a
CMD [ "yarn", "start:prod"]
