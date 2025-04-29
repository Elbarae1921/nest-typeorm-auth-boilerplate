# ⚠️ This is outdated
I don't recommend following this template anymore as it's outdated, and I think there are far better ORMs than TypeORM that you should use nowadays.
here's a newer starter project that uses Prisma ORM: https://github.com/Elbarae1921/nestjs-auth-starter

## Description

A NestJS boilerplate with authentication and TypeORM.

## Setup

Create a `.env` (for running the app outside of docker- development) and `.env.prod` (for running the app inside docker- production) file from the `.env.example` and `.env.prod.example` respectively, and assign the variables their corresponding values.

### Development
```bash
$ # start up the db
$ yarn docker:db
$ # install dependencies
$ yarn
$ # run the migrations
$ yarn migration:up
$ # optionally seed the database
$ yarn seed:config
$ yarn seed:run
$ # start the app in watch mpde
$ yarn start:dev
```

### Production
```bash
$ yarn docker:compose
$ yarn docker:migration:up
```
