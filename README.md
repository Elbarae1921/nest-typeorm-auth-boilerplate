## Description

A production-ready NestJS boilerplate with authentication and TypeORM.

## Setup

Create a `.env` file from the `.env.example` and assign the variables their corresponding values.

```bash
$ docker-compose up -d
$ yarn
$ yarn typeorm migration:run
$ yarn seed:config
$ yarn seed:run
```

## Start

```bash
$ yarn start:dev
```
