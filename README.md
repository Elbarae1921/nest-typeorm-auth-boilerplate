## Description

A NestJS boilerplate with authentication and TypeORM.

## Setup

Create a `.env` (for running the app inside docker- production) and `.env.local` (for running the app outside docker) file from the `.env.example` and `.env.local.example` respectively, and assign the variables their corresponding values.

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
