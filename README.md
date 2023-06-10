# Mood Journal

## Steps

1. create the landing page
2. add authentication via clerk (service that makes it super easy and fast to do)

## Notes

use `.env.local` in root dir so that Next automatically knows; otherwise, if you just use `.env` you need to do some extra work to let Next know.

restart dev server when modifying `env` file so it can pick up the changes

to test auth, clear cookies and local storage in browser via inspect -> Application and then reload home page and sign in again

## Planetscale notes

1. make acc
2. make db
3. install their CLI tool pscale on local machine
4. login via cli with command `pscale auth login`
5. create new dev branch for the db `pscale branch create mood dev` (new branch called dev created, `mood` is the name of the db we created)
6. connect to this branch with `pscale connect mood dev --port 3309` notice we first state the db name and then branch name
7. we do this because we have to connect to the db via terminal first before our next app can

## Prisma Notes

install prisma extension on VSC

1. install these two to your next project: `npm i @prisma/client` and `npm i prisma --save-dev`
2. `npx prisma init` will create on root dir a folder called prisma and a file called schema.prisma
3. in `.env` (which npx prisma init created, dont confuse with `.env.local`), we will add the URL to our locally hosted instance of planetscale which looks like `DATABASE_URL="mysql://root@127.0.0.1:3309/mood"`. Replace `mood` with db name for any other projects
4. in `schema.prisma` add this

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"
}

model User {
  id String @id @default(uuid())
}
```

5. now we can sync our local instance to the one on planetscale by running this command from the project root directory `npx prisma db push`
6. now that User model should create a new table in the hosted instance of the dev branch
7. anytime a change is made to the local instance of the DB, you have to run `npx prisma db push` so the online instance is in sync
