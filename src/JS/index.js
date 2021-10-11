const {app, BrowserWindow, ipcRenderer} = require('electron');
const fs = require('fs');
const pfad = require('path');
const remote = require('electron').remote;



//Hohlt das Aktuelle Datum
const datum = () => {
  const heute = document.getElementById('datum');
  const date = new Date();
  let monat = date.getMonth() + 1;
  let tag = date.getDate();
  let jahr = date.getFullYear();
  heute.innerText = `${tag}.${monat}.${jahr}`;
};
datum();


/* document.getElementById("minimizeWindow").addEventListener("click", function (e) {
  var window = remote.getCurrentWindow();
  window.minimize(); 
});

document.getElementById("fullWindow").addEventListener("click", function (e) {
  var window = remote.getCurrentWindow();
  if (!window.isMaximized()) {
      window.maximize();          
  } else {
      window.unmaximize();
  }
});

document.getElementById("closeWindow").addEventListener("click", function (e) {
  var window = remote.getCurrentWindow();
  window.close();
}); 
 */









