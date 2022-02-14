const { app, BrowserWindow, ipcMain, dialog} = require('electron');
const remoteMain = require("@electron/remote/main");
const fs = require('fs');

remoteMain.initialize();

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    fullscreen: false,
    width: 800,
    height: 850,
    icon: './src/assets/img/logo.ico',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    
  })
  remoteMain.enable(mainWindow.webContents);
  mainWindow.setMenuBarVisibility(false)
  mainWindow.loadFile('src/Templates/index.html')
  //mainWindow.webContents.openDevTools()
  
}

app.whenReady().then(() => {
  
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


/**
 * npx electron-packager . --icon=src/assets/img/logo.ico --prune=true
 * 
 * --platform=win32
 * --platform=linux
 * --platform=darwin
 * --platform=all
 * 
 * quellcode verschlüsseln => --asar
 * 
 * entfernt überflüssige packette => --prune=true
 * 
 * 
 */

