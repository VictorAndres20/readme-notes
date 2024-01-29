# Testing Express with Jest and supertest

------------------------------------------------------------------------------------------------

## With JavaScript
### Install libraries

```
npm install -D jest supertest
```

### Execute
```
NODE_ENV=test npx jest --verbose
```

-------------------------------------------

## With TypeScript
### Install libraries

```
npm install -D ts-jest @types/jest supertest @types/supertest
```

### Creates initial Jest configuration
jest.config.js
```
npx ts-jest config:init
```

Set like this
```
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
};
```

### Execute
```
NODE_ENV=test npx jest --verbose --silent
```


------------------------------------------------------------------------------------------------

## Example structure
- src/index.js
- test/
- test/api/ ...................................................... Test API project
- test/api/entity1/
- test/api/entity1/endpoints/ .................................... Test entity1 endpoints
- test/api/entity1/endpoints/find_all.test.ts .................... Test specific endpoint
- ................... "" "" "" ...................................
- test/api/entity1/providers/ .................................... Test entity1 providers
- test/api/entity1/providers/find_all.test.ts .................... Test specific provider
- ................... "" "" "" ...................................
- test/utils/ .................................................... Test utilities
- test/utils/validate_dates.test.ts .............................. Test utility validate dates

------------------------------------

### Test endpoint calls
To test endpoints calls is important to export server instance
and use it in test files

```
import express, { Express } from 'express';
import dotenv from 'dotenv';
import { registerRoutes } from './api/register_routes';
import { StaticPrismaClient } from './config/db';
import { Server } from 'node:http';
dotenv.config();

StaticPrismaClient.buildClient();

let app: Express = express();

registerRoutes(app);

const server: Server = app.listen(process.env.PORT ?? 8000, () => {
    console.log("Server started...");
});

// Export server instance -------------------------------------------------> this
export default { server };
```

test/api/entity1/endpoints/find_all.test.ts

```
import request from 'supertest';

import app from '../../../../src/index';
import { StaticPrismaClient } from '../../../../src/config/db';

// Maybe you need to create mock data in TEST DATABASE instance
beforeAll(done => {
    StaticPrismaClient.buildClient().$transaction([
        StaticPrismaClient.buildClient().demand.deleteMany({}),
        StaticPrismaClient.buildClient().demand.createMany({
            data: [{name: 'Vic'}, {name: 'Ana'}],
        }),
    ]);
    done();
});

afterAll(done => {
    // Close server 
    app.server.close();
    done();
});

describe("/demand calls", () => {
    test("it should return 200 status code", async () => {
        let response = await request(app.server)
            .get('/demand')
            .set('Accept', 'application/json');
        expect(response.status).toEqual(200);
    });

    test("it should have 2 items", async () => {
        let response = await request(app.server)
            .get('/demand')
            .set('Accept', 'application/json');
        expect(response.status).toEqual(200)
        expect(response.body).toHaveLength(13);
    });
});


```


### Maybe change datasource url for test database in Prisma
In Singleton

```
import { PrismaClient } from '@prisma/client'

export class StaticPrismaClient{

    static prisma: PrismaClient;

    private constructor(){}

    public static buildClient(): PrismaClient {
        if(this.prisma === null || this.prisma === undefined){
            if(process.env.NODE_ENV === 'test'){
                console.log("Creating Prisma Client for test Database");
                this.prisma = new PrismaClient({
                    log: ['query', 'info', 'warn', 'error'],
                    datasourceUrl: process.env.DATABASE_URL_TEST,
                });
            } else {
                this.prisma = new PrismaClient({
                    log: ['query', 'info', 'warn', 'error'],
                });
            }
            console.log("Create new Prisma Client");
        }
        return this.prisma;
    }
}
```

------------------------------------------------------------------------------------------------
