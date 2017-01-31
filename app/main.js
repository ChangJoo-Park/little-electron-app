'use strict'
const electron = require('electron')
const autoUpdater = require('electron-updater').autoUpdater
const ipcMain = electron.ipcMain
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')
const SECOND = 1000
const MINUTE = 60 * SECOND

let mainWindow
let contents
let updateChecker
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
  contents = mainWindow.webContents
  contents.openDevTools()
  autoUpdater.checkForUpdates().then(function (result){
    console.log(result)
  })
  updateChecker = setInterval(function () {
    autoUpdater.checkForUpdates()
  }, 5 * MINUTE) 
}

function beforeQuit () {
  if (updateChecker) {
    clearInterval(updateChecker)
  }
}

app.on('ready', createWindow)
app.on('before-quit', beforeQuit)

autoUpdater.on('update-available', function () {
  console.log('A new update is available')
  contents.send('updater-message', 'A new update is available [current : ', process.env.npm_package_version ,' ]')
})
autoUpdater.on('checking-for-update', function () {
  console.log('Checking-for-update')
  contents.send('updater-message', 'Checking for Update..')
})
autoUpdater.on('error', function (error) {
  console.log('error')
  console.error(error)
  contents.send('updater-message', 'Got Error')
})
autoUpdater.on('download-progress', function (bytesPerSecond, percent, total, transferred) {
  console.log(`${bytesPerSecond}, ${percent}, ${total}, ${transferred}`)
  contents.send('updater-message', `download progress : ${bytesPerSecond}, ${percent}, ${total}, ${transferred}`)
})
autoUpdater.on('update-downloaded', function (event) {
  console.log('update-downloaded')
  console.log(event)
  contents.send('updater-message', 'update-downloaded')
  autoUpdater.quitAndInstall()
})

autoUpdater.on('update-not-available', function () {
  console.log('update-not-available')
  contents.send('updater-message', 'update-not-available')
})