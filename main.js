const { app, BrowserWindow } = require('electron')
const path = require('path')
const { autoUpdater } = require('electron-updater')
const log = require('electron-log')

log.transports.file.resolvePathFn = () => path.join("D:\Job\It\Electron\auto-apdate", 'logs/main.log');
log.log("aplication version = " + app.getVersion())
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 300,
    height: 400
  })
  win.loadFile(path.join(__dirname, 'index.html'))
}

autoUpdater.on("checking-for-update", () => {
  log.info("checking-for-update")
})
autoUpdater.on("update-available", () => {
  log.info("update-available")
})
autoUpdater.on("update-not-available", (info) => {
  log.info("update-not-available")
})
autoUpdater.on("error", (error) => {
  log.info("error update: ", error)
})

autoUpdater.on("download-progress", (progressTrack) => {
  log.info("\n\ndownload-progress")
  log.info(progressTrack)
})

autoUpdater.on("download-progress", () => {
  log.info("download-progress")
})

app.on('ready', () => {
  createWindow()
  autoUpdater.checkForUpdatesAndNotify()
})