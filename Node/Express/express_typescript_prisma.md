# Express + TypeScript + Prisma notes
------------------------------------------------------------------------------------------------------
## Configure node project and installs

### Start Node project

```bash
mkdir my-project
cd my-project
npm init
```

### Install express
```bash
npm install express dotenv
```

### Install and configure typescrypt
```bash
npm install -D typescript @types/express @types/node ts-node nodemon
# generate tsconfig.json
npx tsc --init
# uncomment and change "outDir": "./dist",
```

### To execute project
```
{
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "dev": "npx ts-node src/index.ts"
    //"dev": "nodemon src/index.ts"
  }
}
```

### Install Prisma
```bash
npm install -D prisma
```

### Configure prisma
```bash
npx prisma init --datasource-provider postgresql
```

Set the DATABASE_URL in the .env file to point to your existing database
https://www.prisma.io/docs/orm/reference/connection-urls
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/dbname[?schema=ks&connection_limit=5&pool_timeout=2&connect_timeout=100]
```

prisma/schema.prisma where models or entityes are located
```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model post {
  uuid                                           String       @id(map: "pk_post") @default(dbgenerated("gen_random_uuid()")) @db.VarChar(40)
  name                                           String?      @db.VarChar(70)
  date_created                                   DateTime     @default(now()) @db.Timestamp(6)
  date_closed                                    DateTime     @default(now()) @db.Timestamp(6)
  user_id                                        String       @db.VarChar(5)
  owner user @relation("user_post_relation", fields: [user_id], references: [cod], onDelete: NoAction, onUpdate: NoAction, map: "fk_post_user")
}

model user {
  cod                                      String   @id(map: "pk_user") @db.VarChar(5)
  name                                     String   @db.VarChar(70)
  posts post[] @relation("user_post_relation")
}
```

### Pull or migrate DB
**Pull**
If you have tables created and want to create Prisma schema with you created database
```
npx prisma db pull
```
**Migrate**
```
npx prisma migrate dev --name init
```

### Generate Prisma Client
You need to re-run the prisma generate command after every change 
that's made to your Prisma schema to update the generated Prisma Client code.
```bash
npx prisma generate
```

## Configure Express projects structure
- .env .......................................... # Env variables file
- /src
- /src/index.ts ................................. # Server entry point
- /src/controllers
- /src/controllers
- /src/providers

------------------------------------------------------------------------------------------------------ 