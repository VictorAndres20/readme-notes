# Electron JS
https://www.electronjs.org/

## Get started
**Prerequisites**
NodeJS LTS 12.20+ version

**Create new project**
Create folder
´´´
mkdir my-project
cd my-project
´´´

Init Node porject
´´´
npm init
´´´
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "Hello World!",
  "main": "main.js",
  "author": "Viti",
  "license": "MIT"
}

Install Electron
´´´
npm install --save-dev electron
´´´

Add start script in package.json
´´´
//
"scripts": {
    "start": "electron .",
//
´´´

Create entry ponit file main.js
´´´
vi main.js
´´´
´´´
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  // Maximize window
  // win.maximize();
  win.loadFile('./pages/index.html');
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
´´´

Create preload file preload.js
´´´
vi preload.js
´´´
´´´
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }
})
´´´

Create src folder and pages folder
´´´
mkdir src && mkdir pages
´´´

Create index.js file in pages folder
```
vi pages/index.html
```

´´´
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js <span id="node-version"></span>,
    Chromium <span id="chrome-version"></span>,
    and Electron <span id="electron-version"></span>.

    <!-- You can also require other files to run in this process -->
    <script src="./renderer.js"></script>
  </body>
</html>
´´´

**Run app**
Thanks for script in package.json, you can execute
´´´
npm run start
´´´

**ISSUE npm start**
Electron failed to install correctly, please delete node_modules/electron and try installing again

Do it what it says
```
rm -rf node_modules/electron
npm install --save-dev electron --verbose
npm run start
```

---------------------------------------------------------------------------------------------------------------------------------------------------

# Package and distribute your application
https://www.electronjs.org/docs/latest/tutorial/quick-start

**Set product description in package.json**
```
{
  ...
  "description": "My fantastic Electron app",
  ...
}
```

**In ubuntu install rpm**
```
sudo apt-get update
sudo apt-get install rpm
```

```
npm install --save-dev @electron-forge/cli
npx electron-forge import
npm run make
```

Output directory in out/
```
// Example for macOS
out/
├── out/make/zip/darwin/x64/my-electron-app-darwin-x64-1.0.0.zip
├── ...
└── out/my-electron-app-darwin-x64/my-electron-app.app/Contents/MacOS/my-electron-app
```

```
// Example for Ubuntu
out
|-- out/example-linux-x64/app-name
```

---------------------------------------------------------------------------------------------------------------------------------------------------

# React + Electron

1. Create react app
npx create-react-app electron-react
cd electron-react
```

2. Install electron in react app
```
npm i -D electron@latest
```
**or**
```
npm i -D electron@18.2.0
```

3. Install electron builder in react app
```
npm install --save-dev electron electron-builder
```
**or**
```
npm install --save-dev electron@18.2.0 electron-builder@23.0.3
```

4. Install some other develop libraries
```
npm install --save-dev wait-on concurrently
npm install electron-is-dev@2.0.0
```
**or**
```
npm install --save-dev wait-on@6.0.1 concurrently@7.1.0
npm install electron-is-dev@2.0.0
```

5. Create new files in public/ folder called electron.js and preload.js
public/electron.js
```
vi public/electron.js
```

```
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

var mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'icon.png'),
    // Set the path of an additional "preload" script that can be used to
    // communicate between node-land and browser-land.
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false
    },
  });
  // Maximize window
  mainWindow.maximize();
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    // BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  } else {
    // Remove menubar that appears by default
    mainWindow.removeMenu();
  }
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// If you have some backend operations and want to execute in frontend, register here
/*
ipcMain.handle('readProductsExcel', readProductsExcel);
ipcMain.handle('getPrintPDF', async (event, parameters) => getPrintPDF(parameters));
*/

// To execute then, in frontend import icpRender from electron like this
/*
const { ipcRenderer } = window.require('electron');
*/
// Then, invoke them
/*
export const readExcel = async () => {
    return await ipcRenderer.invoke('readProductsExcel');
}

export const getPDF = async (data) => {
    return await ipcRenderer.invoke('getPrintPDF', data);
}
*/
```

```
vi public/preload.js
```

```
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
//const { contextBridge } = require("electron");

// As an example, here we use the exposeInMainWorld API to expose the browsers
// and node versions to the main window.
// They'll be accessible at "window.versions".
// Other example is that you can build main electron functions that need special NodeJS actions that React doesnt have
// and use it in React context with window.something
// For example you can register: 
//                   contextBridge.exposeInMainWorld("myfunc", () => console.log('Hi'));
// and call it with "window.myfunc".
//
// You can invoke functions in electron.js (main.js) if you need some electron or node modules that here are undefined
//                   contextBridge.exposeInMainWorld("electronScreen", async () => await ipcRenderer.invoke('electronScreen'));
// In electron.js (main.js) you need to regiter in ipcMain that handler after webPreferences
// 
//process.once("loaded", () => {
//  contextBridge.exposeInMainWorld("versions", process.versions);
//});
```

6. Add main tag in package.json
```
{
...
  "dependencies": {
    "electron-is-dev": "^2.0.0",
    "react": "^16.8.3",
    "react-dom": "^16.8.3",
    "react-scripts": "2.1.5"
  },
  "main": "public/electron.js", <------ this>
...
}
```

7. Add homepage tag in package.json
```
{
  "name": "electron-react",
  "version": "0.1.0",
  "private": true,
  "homepage": "./", <----- THIS>
  ...
```

8. Update browserslist’s targets
Update the browserslist section of package.json to support only the latest Electron version. 
This ensures Webpack/Babel will only add the polyfills and features we strictly need, keeping the bundle size to the minimum.

```
  "browserslist": {
    "production": [
      "last 1 electron version"
    ],
    "development": [
      "last 1 electron version"
    ]
  },
```

9. In package.json, inside "scripts" tag, add at the end of scripts
```
{
...
  "dependencies": {
    "electron-is-dev": "^1.0.1",
    "react": "^16.8.3",
    "react-dom": "^16.8.3",
    "react-scripts": "2.1.5"
  },
  "main": "public/electron.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "electron-dev": "concurrently \"npm start\" \"wait-on http://localhost:3000 && electron .\"" <--- THIS>
  },
...
}
```
10. Create .env file in root project folder
```
BROWSER=none
```
11. Run app with 
```
npm run electron-dev
```

**React 18.1.0 > Issue**
[0] Failed to compile.
[0] 
[0] ./src/App.js
[0]   Line 6:    'React' must be in scope when using JSX  react/react-in-jsx-scope

Solution:
In js files need React import:
For example in this case, need React import in App.js
```
import React from 'react';
// All code
```

**Windows SO issue**
Executing "npm run electron-dev", maybe an error occured like
[0] "BROWSER" no se reconoce como un comando interno o externo,
[0] programa o archivo por lotes ejecutable
[0] BROWSER=none yarn start exited with code 1

Solution:
1. Create .env file in root project folder
2. Add 
```
BROWSER=none
```
3. Remove BROWSER=none in package.json script
"electron-dev": "concurrently \"npm start\" \"wait-on http://localhost:3000 && electron .\""

---------------------------------------------------------------------------------------------------------------------------------------------------

# Package and distibute electron with react application
https://mmazzarolo.com/blog/2021-08-12-building-an-electron-application-using-create-react-app/

**On Ubunutu install rpm**
```
sudo apt-get update
sudo apt-get install rpm
```

Add Author with email and Description in package.json
```
{
  ...
  "author": "Viti <viti@vapedraza.com>",
  "description": "My fantastic Electron app",
  ...
}
```

Add Build tag key on top level in package.json
```
{
...,
  "build": {
    "appId": "com.electron.myapp",
    "productName": "My Electron App",
    "files": ["build/**/*", "node_modules/**/*"],
    "directories": {
      "buildResources": "public"
    },
    "mac": {
      "target": "dmg"
    },
    "win": {
      "target": "nsis"
    },
    "linux": {
      "target": "deb"
    }
  }
}
```

Add the packaging scripts in package.json
```
{
  ...
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "electron-dev": "concurrently -k \"cross-env BROWSER=none npm start\" \"wait-on http://localhost:3000 && electronmon .\"",
    "electron:package:mac": "npm run build && electron-builder -m -c.extraMetadata.main=build/electron.js", <--- this>
    "electron:package:win": "npm run build && electron-builder -w -c.extraMetadata.main=build/electron.js", <--- this>
    "electron:package:linux": "npm run build && electron-builder -l -c.extraMetadata.main=build/electron.js" <--- this>
  },
  ...
}
```

Run script
```
npm run electron:package:linux
```

Ouput folder is dist/
```
//Example in Ubuntu
dist
|-- linux-unpacked/you-app
|-- you-app.deb
```

```
//Example in Windows10
dist
|-- win-unpacked/ElectronApp.exe
|-- ElectronApp Setup x.x.exe
```

**Issue timeout Downloading electron from github**
Example error:
https://github.com/electron/electron/releases/download/v18.0.3/electron-v18.0.3-linux-x64.zip: dial tcp: lookup github.com on 127.0.0.53:53: read udp 127.0.0.1:46004->127.0.0.53:53: i/o timeout

Solution is to 
Create a repo folder cache and paste electron.zip

1. Download in your computer the file from URL in error message, example above
```
https://github.com/electron/electron/releases/download/v18.0.3/electron-v18.0.3-linux-x64.zip
```

2. Create a repo floder for electron-builder
```
mkdir /home/viti/electronjs-projects/repo/electron/
```

3. Paste .zip or file downloaded in repo folder created before
```
mv electron-v18.0.3-linux-x64.zip /home/viti/electronjs-projects/repo/electron/
```

4. Add Cache key tag in package.json insede build key tag
```
{
  ...
  "build": {
    "appId": "com.electron.myapp",
    "productName": "ElectronApp",
    "files": ["build/**/*", "node_modules/**/*"],
    "directories": {
      "buildResources": "public"
    },
    "mac": {
      "target": "dmg"
    },
    "win": {
      "target": "nsis"
    },
    "linux": {
      "target": "deb"
    },
    "electronDownload": { <------------------------------------------- THIS>
      "cache": "/home/viti/electronjs-projects/repo/electron/" <------ THIS>
    }
  }
}

```

5. Run script again
```
npm run electron:package:linux
```
---------------------------------------------------------------------------------------------------------------------------------------------------

# Basic example of routing with states in react + electron

```
import './App.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { message } from 'antd';

const Home = () => {

  React.useEffect(() => {
    console.log('Load Home');
    fetch('https://catfact.ninja/fact')
    .then(res => (res.json()))
    .then(data => alert(data.fact))
    .catch(err => {
      message.error(err.message);
    });
  }, []);

  return(<>Hi from Home</>);
}

const Office = () => {

  React.useEffect(() => {
    console.log('Load Office');
  }, []);

  return(<>Hi from Office</>);
}

const routes = {
  home: {key: 'home',render: () => (<Home />)},
  office: {key: 'office',render: () => (<Office />)}
}

function App() {

  const [route, setRoute] = React.useState(routes.home);

  const router = () => {
    return route.render();
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              App Name
            </Typography>
            <Button color="inherit" onClick={() => setRoute(routes.home)}>Home</Button>
            <Button color="inherit" onClick={() => setRoute(routes.office)}>Office</Button>
          </Toolbar>
        </AppBar>
      </Box>
      {router()}
    </div>
  );
}

export default App;
```

---------------------------------------------------------------------------------------------------------------------------------------------------