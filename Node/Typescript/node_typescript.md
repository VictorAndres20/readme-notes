# Node + TypeScript
------------------------------------------------------------------------------------------------------
## Configure node project and installs

### Start Node project

```bash
mkdir my-project
cd my-project
npm init
```

### Install and configure typescrypt
```bash
npm install -D typescript @types/express @types/node ts-node nodemon
npm install tslib
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

------------------------------------------------------------------------------------------------------ 