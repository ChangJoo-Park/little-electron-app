const electron = require('electron') // require('electron-auto-updater')
const ipcRenderer = electron.ipcRenderer


ipcRenderer.on('updater-message', (event, message) => {
  console.log(message)
})
// // This file is required by the index.html file and will
// // be executed in the renderer process for that window.
// // All of the Node.js APIs are available in this process.
// let log = document.querySelector('.log')
// const app = require('electron').remote.app // require('electron-auto-updater')
// log.innerHTML = log.innerHTML + '<p>GET REMOTE ELECTRON</p>'
// const updater = require('electron').remote.require('electron-updater')

// log.innerHTML = log.innerHTML + '<p>GET REMOTE AUTO UPDATER</p>'
// console.log('current version: ' + app.getVersion())
// log.innerHTML = log.innerHTML + '<p>current version: ' + app.getVersion() + '</p>'

// updater.autoUpdater.checkForUpdates()
// updater.autoUpdater.addListener('update-available', function () {
//   console.log('A new update is available')
//   log.innerHTML = log.innerHTML + '<p>A new update is available</p>'
// })

// updater.autoUpdater.addListener('update-not-available', function () {
//   console.log('update-not-available')
//   log.innerHTML = log.innerHTML + '<p>update-not-available</p>'
// })

// updater.autoUpdater.addListener('download-progress', function (bytesPerSecond, percent, total, transferred) {
//   console.log('download-progress')
//   log.innerHTML = log.innerHTML + `<p>download-progress ${bytesPerSecond}, ${percent}, ${total}, ${transferred}</p>`
// })

// updater.autoUpdater.addListener('update-downloaded', (event) => {
//   console.log('A new update is ready to install', `Version is downloaded and will be automatically installed on Quit`)
//   console.log('quitAndInstall')
//   log.innerHTML = log.innerHTML + '<p>A new update is ready to install</p>'
//   log.innerHTML = log.innerHTML + '<p>Restart in 10 seconds</p>'
//   setTimeout(() => {
//     updater.autoUpdater.quitAndInstall()
//   }, 10000)
//   return true
// })
// updater.autoUpdater.addListener('error', (error) => {
//   log.innerHTML = log.innerHTML + '<p>got some error</p>'
//   const errorJSON = JSON.stringify(error)
//   log.innerHTML = log.innerHTML + '<pre>' + errorJSON + '</pre>'
//   console.log(error)
// })
// updater.autoUpdater.addListener('checking-for-update', () => {
//   console.log('checking-for-update')
//   log.innerHTML = log.innerHTML + '<p>checking-for-update</p>'
// })