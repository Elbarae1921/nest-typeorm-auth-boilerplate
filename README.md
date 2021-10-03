## Description

A NestJS boilerplate with authentication and TypeORM.

## Setup

Create a `.env.local` for local development (outisde docker) from the `.env.local.example` file.

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

Create a `.env` for production from the `.env.example` file.

```bash
$ yarn docker:compose
$ yarn docker:migration:up
```
