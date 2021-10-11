const { app, BrowserWindow, ipcMain, Menu} = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1230,
    height: 850,
    webPreferences: {
      /* preload: path.join(__dirname, 'preload.js'), */
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  mainWindow.loadFile('src/Templates/index.html')
  //mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

