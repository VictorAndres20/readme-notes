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
    }
}
```


webpack.dev.js
```
const { merge } = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: '/'
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html',
            favicon: "./public/favicon.ico",
        }),
    ]
}
module.exports = merge(commonConfig, devConfig);
```

webpack.prod.js
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

if(process.env.NODE_ENV === 'development') mainMount('landpage-root');

export { mainMount };
```

**Change start script in package.json file**
package.json
```
{
  ...
    "scripts": {
      "start": "webpack serve --config webpack.dev.js", --> THIS
      "build": "react-scripts build",
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
    }
}
```


webpack.dev.js
```
const { merge } = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: '/'
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html',
            favicon: "./public/favicon.ico",
        }),
    ]
}
module.exports = merge(commonConfig, devConfig);
```

webpack.prod.js
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

**Change start script in package.json file**
package.json
```
{
  ...
    "scripts": {
      "start": "webpack serve --config webpack.dev.js", --> THIS
      "build": "react-scripts build",
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
const HtmlWebPackPlugin = require('html-webpack-plugin');
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
        new HtmlWebPackPlugin({
            template: './public/index.html',
            favicon: "./public/favicon.ico",
        }),
    ]
}
module.exports = merge(commonConfig, devConfig);
```


----------------------------------------------------------------------------------------

## Integration Container Setup

**Add ModuleFederationPlugin webpack.dev.js configuration for integration**
webpack.dev.js
```
const { merge } = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
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
        new HtmlWebPackPlugin({
            template: './public/index.html',
            favicon: "./public/favicon.ico",
        }),
    ]
}
module.exports = merge(commonConfig, devConfig);
```


----------------------------------------------------------------------------------------

## Use Remotes as Components in Container

```
import { mainMount } from 'landpage/LandscapeIndex';
import React from 'react';

const RemoteLandpage = () => {
    const root_element = "remote-landpage";

    React.useEffect(() => {
        mainMount(root_element);
    },[]);

    return(
        <div id={root_element}></div>
    );
}

export default RemoteLandpage;
```

----------------------------------------------------------------------------------------