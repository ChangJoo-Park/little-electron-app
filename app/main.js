'use strict'
const electron = require('electron')
const autoUpdater = require('electron-updater')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))  
  // autoUpdater.signals.updateDownloaded((info) => {
  //   notify("A new update is ready to install", `Version ${info.version} is downloaded and will be automatically installed on Quit`)
  // })
}
function notify(title, message) {
  let windows = BrowserWindow.getAllWindows()
  console.log(windows)
  if (windows.length == 0) {
    return
  }

  windows[0].webContents.send("notify", title, message)
}

app.on('ready', createWindow)


const log = require('electron-log')
log.transports.file.leve = 'info'
autoUpdater.logger = log
console.log(autoUpdater.app)