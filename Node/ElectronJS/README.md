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
      preload: path.join(__dirname, 'preload.js')
    }
  })

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
mkdir folder
mkdir pages
´´´

Create index.js file in pages folder
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

---------------------------------------------------------------------------------------------------------------------------------------------------