# Cypress - Test React components
---------------------------------------------------------------------------------------------
https://docs.cypress.io/guides/component-testing/react/overview

## Install
```
npm install cypress -D
```

**Open Cypress**
```
npx cypress open
```

---------------------

## Configuration
https://github.com/cypress-io/cypress-component-testing-apps/tree/main/react-vite-ts

- Create cypress.d.ts
```
import { mount } from 'cypress/react';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}
```

- Create cypress folder with support and fixtures folder
```
cypress/
cypress/fixtures/
cypress/support/
cypress/support/component-index.html
cypress/support/component.ts
cypress/support/commands.ts
```

- cypress/support/component.ts
```
// for now empty
// https://github.com/cypress-io/cypress-component-testing-apps/blob/main/react-vite-ts/cypress/support/commands.ts

```

- cypress/support/component-index.html
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Components App</title>
    
  </head>
  <body>
    
    <div data-cy-root></div>
  </body>
</html>
```

- cypress/support/component.ts
```
// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18'
// Ensure global app styles are loaded:
import '../../src/index.css';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(<MyComponent />)
```

- Create cypress.config.ts
**In CRA**
cypress.config.ts
```
import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
```

**In Vite**
cypress.config.ts
```
import { defineConfig } from 'cypress'
import customViteConfig from './customConfig'

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      // optionally pass in vite config
      viteConfig: customViteConfig,
      // or a function - the result is merged with
      // any `vite.config` file that is detected
      viteConfig: async () => {
        // ... do things ...
        const modifiedConfig = await injectCustomConfig(baseConfig)
        return modifiedConfig
      },
    },
  },
});
```

- package.json add test script
```
{
  ...
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "cypress:run": "cypress run --config video=false --component"
  },
  ...
}
```

## Run cypress tests
```
npx cypress run --config video=false --component
```

---------------------------------------------------------------------------------------------

## Usage

MyComponent.cy.tsx
```
import MyComponent from './MyComponent';

describe('LoginForm', () => {
  it('should redirect to welcome screen when creds are correct', () => {
   cy.mount(<App />);
    cy.get('#name').type('testuser');
    cy.contains('Password').find('input').type('testpassword');
    cy.get("#dropdown").select("Technical Team");
    cy.intercept('POST', '/auth', {
      statusCode: 200,
      body: {
        message: 'Authenticated',
      },
    });
    cy.get('button').contains('Login').as('loginButton').click();
    cy.contains('Welcome testuser!')
  });

  it('should show error message when creds are incorrect', () => {
    cy.mount(<App />);
    cy.get('#name').type('baduser');
    cy.contains('Password').find('input').type('badpassword');
    cy.intercept('POST', '/auth', {
      statusCode: 401,
      body: {
        message: 'Bad username or password',
      },
    });
    cy.get('button').contains('Login').as('loginButton').click();
    cy.contains('Bad username or password');
  });
});
```

---------------------------------------------------------------------------------------------