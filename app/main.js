'use strict'
const electron = require('electron')
const autoUpdater = require('electron-updater').autoUpdater
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.webContents.openDevTools()
}

app.on('ready', createWindow)
// console.log(autoUpdater)
autoUpdater.checkForUpdates()
autoUpdater.on('update-available', function () {
  console.log('A new update is available')
  // log.innerHTML = log.innerHTML + '<p>A new update is available</p>'
})
autoUpdater.on('checking-for-update', function () {
  console.log('Checking-for-update')
})
autoUpdater.on('error', function (error) {
  console.log('error')
  console.error(error)
})
autoUpdater.on('download-progress', function (bytesPerSecond, percent, total, transferred) {
  console.log(`${bytesPerSecond}, ${percent}, ${total}, ${transferred}`)
})
autoUpdater.on('update-downloaded', function (event) {
  console.log('update-downloaded')
  console.log(event)
})

autoUpdater.on('update-not-available', function () {
  console.log('update-not-available')
})