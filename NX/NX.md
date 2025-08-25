# NX monorepo
https://nx.dev/getting-started/intro

------------------------------------------------------------------------------------------------

## Maybe you want to install

If you want to have it globally you can do it, but also you can use NX with `npx`

```
npm add --global nx
```

------------------------------------------------------------------------------------------------

## Start repository (or workspace)

You can create a new NX workspace with default config using `create-nx-workspace` command

```
npx create-nx-workspace@latest --name="my-app-name" --preset=ts --formatter=prettier
```

OR to add NX to an existing repo use

```
nx init
```

After this maybe you will need to update your `tsconfig.base.json` adding and updating:

```
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "rootDir": ".",
    "baseUrl": ".",
    "paths": {} // To register your libraries paths
  }
}
```

------------------------------------------------------------------------------------------------

## Create applications

### Create NestJS apps
https://nx.dev/technologies/node/nest/introduction

1. Add `@nx/nest` plugin

```
npx nx add @nx/nest
```

2. Now you can create Nest applications

```
npx nx g @nx/nest:app apps/my-api --linter=eslint --unitTestRunner=jest
```

```
npx nx g @nx/nest:app apps/my-worker
```

3. Since we update tsconfig.base.json to have `"moduleResolution": "bundler"` we need to tell web pack to resolve paths by tsconfig paths, to do this lets install `tsconfig-paths-webpack-plugin`

```
npm install -D tsconfig-paths-webpack-plugin
```

4. Add the resolver inside nest `app webpack.config.js`

```
...
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  ...
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
  },
  ...
};
```

### Create React apps

1. Add `@nx/react` plugin

```
npx nx add @nx/react
```

2. Now you can create React applications

```
npx nx g @nx/react:app apps/my-web --bundler=vite
```

3. We need to check if include property is added in `@nx/vite/plugin` in `nx.json`.

```
    {
      "plugin": "@nx/vite/plugin",
-----------------------------------> Add this to just serve react apps and not libraries
      "include": [
        "apps/**/*"
      ],
----------------------------------->
      "options": {
        "buildTargetName": "build",
        "testTargetName": "test",
        "serveTargetName": "serve",
        "devTargetName": "dev",
        "previewTargetName": "preview",
        "serveStaticTargetName": "serve-static",
        "typecheckTargetName": "typecheck",
        "buildDepsTargetName": "build-deps",
        "watchDepsTargetName": "watch-deps"
      }
    },
```

4. Tell vite to resolve your future library imports using tsconfig paths. Update your react app `vite.config.ts` plugins:

```
...
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig(() => ({
...
  plugins: [
    react(), 
    nxViteTsPaths()  // this makes Vite understand tsconfig paths
  ],
...
}));
```

------------------------------------------------------------------------------------------------

## Create libraries/packages

### Create NestJS library

1. Execute:

```
npx nx g @nx/nest:lib packages/api/api-commons --linter=eslint --unitTestRunner=none --buildable=false
```

Maybe with unit tests runner

```
npx nx g @nx/nest:lib packages/api/feat-users --linter=eslint --unitTestRunner=jest --buildable=false
```

2. Add your new libs to a global path in `tsconfig.base.json` using `path` key

```
    "paths": {
      ...
      "@my-app/api/api-commons": ["packages/api/api-commons/src/index.ts"],
      "@my-app/api/feat-users": ["packages/api/feat-users/src/index.ts"], 
      ...
    }
```

3. To import nest libraries inside your nest applications, you need to update your nest application `tsconfig.app.json` file referencing your libraries `tsconfig.lib.json` files like:

```
{
  ...
  "references": [
    {
      "path": "../../packages/api/api-commons/tsconfig.lib.json"
    },
    {
      "path": "../../packages/api/feat-users/tsconfig.lib.json"
    }
  ]
}
```

4. Sometimes these libraries don't have available decorators so you can enable them on `tsconfig.lib.json` file

```
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
```


### Create React libraries

1. Execute

```
npx nx g @nx/react:lib packages/web/ui-components --bundler=vite --linter=eslint --unitTestRunner=jest
```

```
npx nx g @nx/react:lib packages/web/users-page --bundler=vite --linter=eslint --unitTestRunner=jest
```

2. Add your new libs to a global path in `tsconfig.base.json` using `path` key

```
    "paths": {
      ...
      "@my-app/web/ui-components": ["packages/web/ui-components/src/index.ts"],
      "@my-app/web/users-page": ["packages/web/users-page/src/index.ts"], 
      ...
    }
```

3. To import react libraries inside your react applications, you need to update your react application `tsconfig.app.json` file referencing your libraries `tsconfig.lib.json` files like:

```
{
  ...
  "references": [
    {
      "path": "../../packages/web/ui-components/tsconfig.lib.json"
    },
    {
      "path": "../../packages/web/users-page/tsconfig.lib.json"
    }
  ]
}
```

### Create Typescript libraries

1. Execute

```
npx nx g @nx/js:lib packages/web/api-client --bundler=tsc --linter=eslint --unitTestRunner=none
```

2. Add your new libs to a global path in `tsconfig.base.json` using `path` key

```
    "paths": {
      ...
      "@my-app/web/api-client": ["packages/web/api-client/src/index.ts"],
      ...
    }
```

------------------------------------------------------------------------------------------------

## Start dev application

To run one application you can use:

```
npx nx serve my-api
```

To run all applications you can use

```
npx nx run-many --target=serve
```

------------------------------------------------------------------------------------------------

## Build projects

To build one application you can use:

```
npx nx build my-web
```

To build all projects you can use

```
npx nx run-many --target=build
```

------------------------------------------------------------------------------------------------

## Package.json scripts

Useful update for your package.json

```
  "scripts": {
    "build": "npx nx run-many --target=build",
    "serve": "npx nx run-many --target=serve",
    "serve:high-mem": "NODE_OPTIONS=--max-old-space-size=8192 npx serve",
    "test": "pnpm nx run-many --targets=test --parallel=10"
  },
```

------------------------------------------------------------------------------------------------

## Deployment phase
