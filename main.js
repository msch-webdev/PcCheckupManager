const { app, BrowserWindow, ipcMain, dialog} = require('electron');
const remoteMain = require("@electron/remote/main");
const fs = require('fs');

remoteMain.initialize();

let mainWindow;
let customerWin;
let loadingwindow;

// Ohne Ladebild

/* function createWindow () {
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
}) */

// Mit Ladebild

function createWindow () {
  mainWindow = new BrowserWindow({
    show: false,
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

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    loadingwindow.hide();
  })
  
}


app.on("ready", () => {

  loadingwindow = new BrowserWindow({
    frame : false,
    movable : false,
    width: 500,
    height: 500,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })

  loadingwindow.loadFile('src/Templates/loading.html')
  loadingwindow.show();

})

setTimeout(() => {
  app.whenReady().then(() => {  
    createWindow()

    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
}, 3000);


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


ipcMain.on('openCustomerWindow', function(event) {
  
  customerWin = new BrowserWindow({
    // startet das window nicht, siehe customerWin.once ...
    show: false,
    parent: mainWindow,
    width: 750, 
    height: 780,
    modal: true,
    icon: './src/assets/img/logo.ico',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })
  customerWin.setMenuBarVisibility(false)
  
  customerWin.loadFile('src/Templates/print.html')
  //customerWin.webContents.openDevTools()

  // ... erst wenn Window fertig geladen ist...
  customerWin.once('ready-to-show', () => {
    // setzte Window show auf true;
    customerWin.show();
  })
})

// Drucken der print.html Seite
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
})



