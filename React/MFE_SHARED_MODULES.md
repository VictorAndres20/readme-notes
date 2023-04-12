# Microfrontends with React sharing only module components from remotes to use it in Container
**Run-time federation only sharing modules**
**This make your routing to be only in Container**
----------------------------------------------------------------------------------------

## Remotes Setup
**Execute npx create-react-app**

**Intall webpack and babel deps**
After execute npx create-react-app, install devDependencies
```
npm install webpack@5.68.0 webpack-cli@4.10.0 webpack-dev-server@4.7.4 webpack-merge@5.2.0 html-webpack-plugin@5.5.0 --save-dev
npm install @babel/core@^7.12.3 @babel/plugin-transform-runtime@^7.12.3 @babel/preset-env@^7.12.3 @babel/preset-react@^7.12.3 --save-dev
npm install babel-loader@^8.1.0 clean-webpack-plugin@^3.0.0 css-loader@^5.0.0 style-loader@^2.0.0 --save-dev
npm install copy-webpack-plugin@^11.0.0 --save-dev
npm install url-loader file-loader --save-dev
```

**Create webpack config files**
in root project folder, create:
 
webpack.common.js
```
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/i,
                use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 10000
                  }
                }
              ]
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html',
            favicon: "./public/favicon.ico",
            publicPath: '/',
        }),
    ]
};
```


webpack.dev.js
```
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: '/'
        }
    },
};
module.exports = merge(commonConfig, devConfig);
```

webpack.prod.js (in this moment the file is empty)
```

```

**Change root div id in public index.html and delete links**
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="featurex-root"></div>
  </body>
</html>
```


**Create bootstrap file and change entry APP (src/index.js)**
cut index.js content and paste it in bootstrap.js

src/bootstrap.js
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('featurex-root')); // CHANGE root div name!!!!
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

src/index.js
```
import('./bootstrap');
```

**Change start and build script in package.json file**
package.json
```
{
  ...
    "scripts": {
      "start": "webpack serve --config webpack.dev.js --open", --> THIS
      "build": "webpack --config webpack.prod.js", --> THIS
      "test": "react-scripts test",
      "eject": "react-scripts eject"
    },
  ...
}
```

**Start dev server**
```
npm run start
```

----------------------------------------------------------------------------------------
## Container Setup

**Execute npx create-react-app**

**Intall webpack and babel deps**
After execute npx create-react-app, install devDependencies
```
npm install webpack@5.68.0 webpack-cli@4.10.0 webpack-dev-server@4.7.4 webpack-merge@5.2.0 html-webpack-plugin@5.5.0 --save-dev
npm install @babel/core@^7.12.3 @babel/plugin-transform-runtime@^7.12.3 @babel/preset-env@^7.12.3 @babel/preset-react@^7.12.3 --save-dev
npm install babel-loader@^8.1.0 clean-webpack-plugin@^3.0.0 css-loader@^5.0.0 style-loader@^2.0.0 --save-dev
npm install copy-webpack-plugin@^11.0.0 --save-dev
npm install url-loader file-loader --save-dev
```

**Create webpack config files**
in root project folder, create:
 
webpack.common.js
```
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/i,
                use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 10000
                  }
                }
              ]
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html',
            favicon: "./public/favicon.ico",
            publicPath: '/',
        }),
    ]
};
```

webpack.dev.js
```
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: '/'
        }
    },
};
module.exports = merge(commonConfig, devConfig);
```

webpack.prod.js (in this moment the file is empty)
```

```

**In index.html delete links**
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```


**Create bootstrap file and change entry APP (src/index.js)**
cut index.js content and paste it in bootstrap.js

src/bootstrap.js
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); // In container div id is root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

src/index.js
```
import('./bootstrap');
```

**Change start and build script in package.json file**
package.json
```
{
  ...
    "scripts": {
      "start": "webpack serve --config webpack.dev.js --open", --> THIS
      "build": "webpack --config webpack.prod.js", --> THIS
      "test": "react-scripts test",
      "eject": "react-scripts eject"
    },
  ...
}
```

**Start dev server**
```
npm run start
```

----------------------------------------------------------------------------------------

## Integration Remotes Setup
**Develop your app. routing with react-router-dom V6**

**Create modules and menu_modules with components and paths to export them, like this**
src/modules/app_modules.js
```
import InfoModule from "./info";
import MainModule from "./main";

const modules = [
    {
        label: 'Main Module',
        path: `/`,
        component: MainModule,
    },
    {
        label: 'Info Module',
        path: `/info`,
        component: InfoModule,
    },
];

export { modules };
```

**Continue developing your app. routing with react-router-dom V6**
Example of App.js
```
import React from 'react';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";
import { modules } from './modules/app_modules';

function App() {
  return (
    <Router>
        <Switch>
          {
            modules.map((module, key) =>(
              <Route exact path={`${module.path}`} element={<module.component />} key={`route_${key}`} />
            ))
          }
          <Route path='*' element={<NotFound />} />
        </Switch>
    </Router>
  );
}

function NotFound() {
  return(
    <>Not found</>
  );
}

export default App;
```

**Add ModuleFederationPlugin webpack.dev.js configuration for integration**
webpack.dev.js
```
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('./package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: '/'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'featureX',
            filename: 'remoteEntry.js',
            exposes: {
                './FeatureXModules': './src/modules/app_modules',
            },
            shared: packageJson.dependencies
        }),
    ]
};
module.exports = merge(commonConfig, devConfig);
```

webpack.prod.js
```
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('./package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'featureX',
            filename: 'remoteEntry.js',
            exposes: {
                './FeatureXModules': './src/modules/app_modules',
            },
            shared: packageJson.dependencies
        }),
        new CopyWebpackPlugin({
            patterns: [{ 
                    from: 'public', 
                    globOptions: { 
                        ignore: ["**/index.html"]
                    }, 
                }]
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);
``` 

----------------------------------------------------------------------------------------

## Integration Container Setup
**Add ModuleFederationPlugin webpack.dev.js configuration for integration**
webpack.dev.js
```
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('./package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: '/'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                featureX: 'featureX@http://localhost:8081/remoteEntry.js'
            },
            shared: packageJson.dependencies,
        }),
    ]
};
module.exports = merge(commonConfig, devConfig);
```

webpack.prod.js
```
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('./package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const remote_host = process.env.REMOTE_HOST;
const remote_port = process.env.REMOTE_PORT;

const remote_uri = `${remote_host}:${remote_port}`;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                featureX: `featureX@${remote_uri}/remoteEntry.js`,
            },
            shared: packageJson.dependencies,
        }),
        new CopyWebpackPlugin({
            patterns: [{ 
                    from: 'public', 
                    globOptions: { 
                        ignore: ["**/index.html"]
                    }, 
                }]
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);
```

----------------------------------------------------------------------------------------

## Use a Remote component in Container
```
import React from 'react';

/** Import modules Array with all components in Remote MFE */
import { modules } from 'featureX/FeatureXModules';

const RemoteComponent = () => {

    /** Create a Remote Component from modules Array */
    const RemoteModuleComponent = modules[0].component;

    return(<RemoteModuleComponent />);
}

export default RemoteComponent;
```

----------------------------------------------------------------------------------------

## Create a Remote router component in Container with remote modules Array
**src/remotes/featureX/router.js**
```
import React from 'react';
import { Link, useParams } from 'react-router-dom';

/** Import modules Array with all components in Remote MFE */
import { modules } from 'featureX/FeatureXModules';

const FeatureXRouter = () => {
    let { module } = useParams();

    const MODULES = {};
    modules.forEach(element => {
        MODULES[element.path === '/' ? "main" :  element.path.replace("/", "")] = <element.component />;
    });

    const renderModule = () => {
        if(module in MODULES){
            return MODULES[module];
        } else {
            return <NotFound />
        }
    };

    return (
        <>
            <nav>
                <ul>
                    {
                        modules.map((m, key) => {
                            return(
                                <li key={key}>
                                    <Link to={`/facturabot${m.path === '/' ? "/main" : m.path}`}>{m.label}</Link>
                                </li>
                            );
                        })
                    }
                </ul>
            </nav>
            {renderModule()}
        </>
    );
    
}

export default FeatureXRouter;
```

**App.js**
```
import React from 'react';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";
import { MAIN_ROUTES } from './_config/routes';

import Login from './modules/login';
import FeatureXRouter from './remotes/featurex/router';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path={`${MAIN_ROUTES.login}`} element={<Login />} />
          <Route exact path={`${MAIN_ROUTES.featurex}/:module`} element={<FeatureXRouter />} />
          <Route path='*' element={<NotFound />} />
        </Switch>
    </Router>
  );
}

function NotFound() {
  return(
    <>Not found MAIN</>
  );
}

export default App;

```

----------------------------------------------------------------------------------------