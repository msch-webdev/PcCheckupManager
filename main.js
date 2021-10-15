const { app, BrowserWindow, ipcMain, Menu, webContents, dialog} = require('electron');
const remoteMain = require("@electron/remote/main");
const fs = require('fs');
const remote = require('electron').remote;
const path = require('path')

remoteMain.initialize();

let mainWindow;
let customerWin;
function createWindow () {
  mainWindow = new BrowserWindow({
    fullscreen: false,
    width: 800,
    height: 850,
    webPreferences: {
      /* preload: path.join(__dirname, 'preload.js'), */
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    //frame: false,
    
  })
  remoteMain.enable(mainWindow.webContents);
  mainWindow.loadFile('src/Templates/index.html')
  mainWindow.webContents.openDevTools()
  
}

ipcMain.on('openCustomerWindow', function(event) {

  // Native API des betriebssystems
  //dialog.showErrorBox('Ipc', 'openWindow');
  
  customerWin = new BrowserWindow({
    // startet das window nicht, siehe customerWin.once
    show: false,
    parent: mainWindow,
    width: 660, 
    height: 780,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })
  
  customerWin.loadFile('src/Templates/print.html')
  customerWin.webContents.openDevTools()

  // erst wenn Window fertig geladen ist...
  customerWin.once('ready-to-show', () => {
    // setzte Window show auf true;
    customerWin.show();
  })
})

ipcMain.on('close', function () {
  app.quit()
})

ipcMain.on('fullScreen', function () {
  if (!mainWindow.isMaximized()) {
    mainWindow.maximize();          
  } else {
    mainWindow.unmaximize();
  }
  
})

ipcMain.on('minimizeWindow', function () {
  mainWindow.minimize();
  
})

// Drucken der HTML Seite
ipcMain.on('druck', (event) => {

  dialog.showOpenDialog(customerWin, {
    properties: ['openFile'],
    filters: [{name: 'Texte', extensions: ['json']}]
  }).then(result => {
    if (result.canceled === false) {
      let dateipfad = result.filePaths[0];

      fs.readFile(dateipfad, (err, dateiinhalt) => {
        if(err) {
          return console.log(err);
        }

        let customer = JSON.parse(dateiinhalt);
        
        event.sender.send('JSONobjekt', customer)
      });
    }
  })

  /* var options = {
      silent: false,
      printBackground: false,
      color: false,
      margin: {
          marginType: 'printableArea'
      },
      landscape: false,
      pagesPerSheet: 1,
      collate: false,
      copies: 1,
      header: 'Header of the Page',
      footer: 'Footer of the Page'
  }
  let win = BrowserWindow.getFocusedWindow();

  win.webContents.print(options, (success, failureReason) => {
      if (!success) console.log(failureReason);

      console.log('Print Initiated');
  }); */
  
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


