# Microfrontends with React
----------------------------------------------------------------------------------------

## Remotes Setup
**Execute npx create-react-app**

**Intall webpack and bable deps**
After execute npx create-react-app, install devDependencies
```
npm install webpack@5.68.0 webpack-cli@4.10.0 webpack-dev-server@4.7.4 webpack-merge@5.2.0 html-webpack-plugin@5.5.0 --save-dev
npm install @babel/core@^7.12.3 @babel/plugin-transform-runtime@^7.12.3 @babel/preset-env@^7.12.3 @babel/preset-react@^7.12.3 --save-dev
npm install babel-loader@^8.1.0 clean-webpack-plugin@^3.0.0 css-loader@^5.0.0 style-loader@^2.0.0 --save-dev
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
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html',
            favicon: "./public/favicon.ico",
        }),
    ]
};
```


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
import './index.css';
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

**Create and export mount function in bootstrap file**
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const mainMount = (root_element_id) => {
    const root_element = document.getElementById(root_element_id);
    if(root_element){
        const root = ReactDOM.createRoot(root_element);
        root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
        
        // If you want to start measuring performance in your app, pass a function
        // to log results (for example: reportWebVitals(console.log))
        // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
        reportWebVitals();
    }
}

if(process.env.NODE_ENV === 'development') mainMount('featurex-root');

export { mainMount };
```

**Change start and build script in package.json file**
package.json
```
{
  ...
    "scripts": {
      "start": "webpack serve --config webpack.dev.js", --> THIS
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

**Intall webpack and bable deps**
After execute npx create-react-app, install devDependencies
```
npm install webpack@5.68.0 webpack-cli@4.10.0 webpack-dev-server@4.7.4 webpack-merge@5.2.0 html-webpack-plugin@5.5.0 --save-dev
npm install @babel/core@^7.12.3 @babel/plugin-transform-runtime@^7.12.3 @babel/preset-env@^7.12.3 @babel/preset-react@^7.12.3 --save-dev
npm install babel-loader@^8.1.0 clean-webpack-plugin@^3.0.0 css-loader@^5.0.0 style-loader@^2.0.0 --save-dev
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
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html',
            favicon: "./public/favicon.ico",
        }),
    ]
};
```

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
import './index.css';
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
      "start": "webpack serve --config webpack.dev.js", --> THIS
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
                './FeatureXIndex': './src/bootstrap',
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
                './FeatureXIndex': './src/bootstrap',
            },
            shared: packageJson.dependencies
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
                landpage: `landpage@${remote_uri}/remoteEntry.js`,
            },
            shared: packageJson.dependencies,
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);
```

**Create .env file in root project**
.env
```

```


----------------------------------------------------------------------------------------

## Use Remotes as Components in Container

```
import { mainMount } from 'featureX/FeatureXIndex';
import React from 'react';

const RemoteComponent = () => {
    const root_element = "remote-feature-x";

    React.useEffect(() => {
        mainMount(root_element);
    },[]);

    return(
        <div id={root_element}></div>
    );
}

export default RemoteComponent;
```

----------------------------------------------------------------------------------------

## Routing in container and remotes (react router dom V6) and hisotry (History V5)

#### Remotes
**Install react router dom and history**
```
npm install react-router-dom history
```

**Change bootstrap.js**
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// This for routing
import { createMemoryHistory, createBrowserHistory } from 'history';

// This for routing .Add object property as parameter for routing
const mainMount = (root_element_id, { onNavigate, initialPath, defaultHistory }) => {
    const root_element = document.getElementById(root_element_id);
    if(root_element){
        // This for routing
        const history = defaultHistory || createMemoryHistory({ initialEntries: [initialPath || '/'] });
        if(onNavigate) history.listen(onNavigate);

        const root = ReactDOM.createRoot(root_element);
        root.render(
            <React.StrictMode>
                {/** Add history for routing */}
                <App history={history} />
            </React.StrictMode>
        );
        reportWebVitals();

        //This for routing
        return {
            onParentNavigate({ location }) {
                const nextPathName = location.pathname;
                if(history.location.pathname !== nextPathName) history.push(nextPathName);
            }
        };
    }
}

if(process.env.NODE_ENV === 'development') mainMount('featurex-root', { defaultHistory: createBrowserHistory()}); // Add object property for routing

export { mainMount };
```

**Change App.js**
```
import React from "react";
// Change BrowserRouter to unstable_HistoryRouter
import {
  unstable_HistoryRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";
import PresentationModule from './modules/presentation';
import InfoModule from './modules/info';

// Destructure props history and pass it to Router
function App({ history }) {
  return (
    <Router history={history} >
        <Switch>
          <Route exact path={'/'} element={<PresentationModule />} />
          <Route exact path={`/info`} element={<InfoModule />} />
          <Route path='*' element={<>NOT FOUND</>} />
        </Switch>
    </Router>
  );
}

export default App;
```

**At this point you can develop in isolate**


#### Container
**Install react router dom and history**
```
npm install react-router-dom history
```

**Change bootstrap.js**
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
//This for routing
import { createBrowserHistory } from 'history';

const root = ReactDOM.createRoot(document.getElementById('root'));

//This for routing
const history = createBrowserHistory();

root.render(
  <React.StrictMode>
    {/** Add history */}
    <App history={history} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

**Change App.js**
```
import React from "react";
// This for routing Change BrowserHistory to unstable_HistoryRouter
import {
  unstable_HistoryRouter as Router,
  Routes as Switch,
  Route,
  Link,
} from "react-router-dom";

// This for routing Remote Component
import RemoteFeatureX from './remotes/feature_x';

// This for routing Destructure Props to have history
function App({ history }) {

  //This for routing Pass history to Router
  return (
    <div>
        <Router history={history}>     
          <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Link style={{ marginRight: '10px' }} to={`/`} >Inicio</Link>
          <Link style={{ marginRight: '10px' }} to={`/info`} >Info</Link>
          <Link style={{ marginRight: '10px' }} to={`/billing`} >Billing</Link>
          </div>  
          <Switch>
            {
              /** This for routing. Remote with history props */
              ['/', '/info'].map((path, key) =>(
                <Route exact path={`${path}`} element={<RemoteFeatureX history={history} />} key={`route_${key}`} />
              ))
            }
            <Route exact path={`/billing`} element={<>BILLING</>} />
            <Route path='*' element={<>NOT FOUND</>} />
          </Switch>
      </Router>
    </div>
    
  );
}

export default App;
```

**Change Remote as Components index.js adding new history prop and object porperty in mainMount function**
```
import { mainMount } from 'featureX/FeatureXIndex';
import React from 'react';

// This for routing. Destructure props to have history prop
const RemoteFeatureX = ({ history }) => {
    const root_element = "remote-feature-x";

    // This for routing. Create mount properties
    const mountProps = {
        initialPath: history.location.pathname,
        onNavigate: ({ location }) => {
            if(history.location.pathname !== location.pathname) history.push(location.pathname);
        },
    }

    React.useEffect(() => {
        const { onParentNavigate } = mainMount(root_element, mountProps); // This for routing. With mount props for routing and function onParentNavigate
        //This for routing
        history.listen(onParentNavigate);
    },[]);

    return(
        <div id={root_element}></div>
    );
}

export default RemoteFeatureX;
```

----------------------------------------------------------------------------------------

## Container Import Remotes in Lazy mode, only when Router call them
**App.js**
```
import React from "react";
import {
  unstable_HistoryRouter as Router,
  Routes as Switch,
  Route,
  Link,
} from "react-router-dom";

// This for routing Remote Component in Lazy mode
const RemoteFeatureXLazy = React.lazy(() => import('./remotes/feature_x'));

function App({ history }) {

  return (
    <div>
        <Router history={history}>     
          <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Link style={{ marginRight: '10px' }} to={`/`} >Inicio</Link>
          <Link style={{ marginRight: '10px' }} to={`/info`} >Info</Link>
          <Link style={{ marginRight: '10px' }} to={`/billing`} >Billing</Link>
          </div> 
          {/** Put Switch inside React.Suspense component */} 
          <React.Suspense fallback={ <>Loading...</> }>
            <Switch>
              {
                /** Change component to LazyComponent */
                ['/', '/info'].map((path, key) =>(
                  <Route exact path={`${path}`} element={<RemoteFeatureXLazy history={history} />} key={`route_${key}`} />
                ))
              }
              <Route exact path={`/billing`} element={<>BILLING</>} />
              <Route path='*' element={<>NOT FOUND</>} />
            </Switch>
          </React.Suspense>
      </Router>
    </div>
    
  );
}

export default App;

```


----------------------------------------------------------------------------------------