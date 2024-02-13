# React + TypeScript

## Create application with typescript
```
npx create-react-app my-app --template typescript
```

**OR**

## Add typescript to existing project

1. Install dependencies
```
npm install @types/react @types/react-dom @types/react-router-dom
```

2. Create base tsconfig.json
```
npx tsc --init
```

3. Set this keys in tsconfig.json
```
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom"],
    "jsx": "preserve",
    ...
    "module": "ESNext",
    ...
    "moduleResolution": "Node",
    ...
    //"allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    ...
    "esModuleInterop": true,
    ...
    "forceConsistentCasingInFileNames": true,
    ...
    "strict": true,
    ...
    "skipLibCheck": true
  }
}
```

4. Delete jsconfig.json or rename removed-jsconfig.json

5. test npm start

6. Start changing all to .ts or .tsx if you dont have "allowJs": true in your tsconfig.json and
want to have all your project with TypeScript

7. Change index.js to index.tsx and set it like this
```
import React from 'react';
import * as ReactDOM from 'react-dom';
import './_assets/fonts/SpaceGrotesk.ttf';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

reportWebVitals(console.log);
```

------------------------------------------------------------------------------------------------

## Create React components With TypeScript using .tsx extension

my_component.tsx
```

```