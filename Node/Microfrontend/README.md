# Microfrontend with Node js
----------------------------------------------------------------------------------------

## Definition

**Diagram of mmicrofrontends**
                     AppContainer
                     |          |
                     |          |
               AppFeature1  AppFeature2
                °        °      °
                °        °      °
          ApiFeature1   ApiFeature2

----------------------------------------------------------------------------------------

## Integration types
There are 3 types of Integrations(Assemble all microfrontends in a container)
- Build Time Integration (Import in AppContainer all microfronends as npm package library)
- Run Time Integration (Import in AppContainer all microfronends as link)
- Server Integration

----------------------------------------------------------------------------------------

## Build dist bundle.js file with Webpack
```
npm exec webpack
```

----------------------------------------------------------------------------------------

## Serve development server with webpack
```
npm exec webpack serve
```

----------------------------------------------------------------------------------------

## Federation (Integration)


----------------------------------------------------------------------------------------

## Microfrontend Run Time integration with no Framework

**structure**

- app/
- app/container/
- app/container/public
- app/container/public/index.html
- app/container/src
- app/container/src/index.js
- app/container/webpack.config.js

- app/feature1/
- app/feature1/public
- app/feature1/public/index.html
- app/feature1/src
- app/feature1/src/index.js
- app/feature1/webpack.config.js

- app/feature2/
- app/feature2/public
- app/feature2/public/index.html
- app/feature2/src
- app/feature2/src/index.js
- app/feature2/webpack.config.js

- app/feature.../
- ...

**-----------------------------**
**THE FEATURES**
**-----------------------------**
**Create features as node projects**
Init npm and install dependencies

Feature 1
```
cd app/feature1
npm init
npm install webpack@5.68.0 webpack-cli@4.10.0 webpack-dev-server@4.7.4 faker@5.1.0 html-webpack-plugin@5.5.0
```

Feature 2
```
cd app/feature2
npm init
npm install webpack@5.68.0 webpack-cli@4.10.0 webpack-dev-server@4.7.4 faker@5.1.0 html-webpack-plugin@5.5.0
```

**webpack.config.js in Feautres**
**In both microfrontend projects the webpack config file is the same**
**ONLY CHANGE PROT NUMBER.**
app/featureX/webpack.config.js
```
/** Require to automatically import bundle js scripts in public/index.html */ 
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devServer: {
        port: 8081,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};
```

**feature scr folder**
app/featureX/src/
Represents the JS SPA application 

**feature public folder**
app/featureX/public/
In htis folder html file (or files) will represent the microfrontend.
You can use src folder as SPA application and bundle.js file will be imported 
in a html index file.
you only need to create a index file if you want a SPA

app/featureX/public/index.html
```
<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
        <div id="products"></div>
    </body>
</html>
```

**start microfrontends and container**
inside the root project microfrontend run

Build dist bundle.js (main.js)
```
npm exec webpack
```

serve project in server for open browser
```
npm exec webpack serve
```
OR 
Package.json can be
```
{
...
  "scripts": {
    "start": "webpack serve",
    "build-bundle": "webpack"
  },
...
}
```

**-----------------------------**
**THE CONTAINER**
**-----------------------------**
**Create container as node projects**
Init npm and install dependencies

container
```
cd app/container
npm init
npm install webpack@5.68.0 webpack-cli@4.10.0 webpack-dev-server@4.7.4 html-webpack-plugin@5.5.0 nodemon
```

**webpack.config.js in container**
```
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devServer: {
        port: 8080,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],
};
```

**Container can be a SPA too!! so...**
Lets see...

**container src folder**
app/container/src/
Represents the JS SPA application

**container public folder**
app/container/public/index.html
```
<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
        <div>Soy container</div>
    </body>
</html>
```

**start container**
inside the root project microfrontend run

Build dist bundle.js (main.js)
```
npm exec webpack
```

serve project in server for open browser
```
npm exec webpack serve
```
OR 
Package.json can be
```
{
...
  "scripts": {
    "start": "webpack serve",
    "build-bundle": "webpack"
  },
...
}
```

**-----------------------------**
**THE FEDERATION**
**-----------------------------**
- Designate an app as HOST (container) and other as REMOTE (Features)
- In the REMOTE, decide which modules (files) you want to make available to other projects
- Set up Module Federation plugin to expose those files (in webpack.config.js)
- In the HOST, decide which files you want to get from the remote
- Set up Module Federation plugin to fetch those files (in webpack.config.js)
- In the HOST, create (or refactor) entry point (src/index.js) to load asynchronously
- In the HOST, import whatever files you need from the remote



----------------------------------------------------------------------------------------

