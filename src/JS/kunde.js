const {app, BrowserWindow, ipcRenderer} = require('electron');
const fs = require('fs');
const pfad = require('path');


//Eventlistener zum Speichern der Daten
const kundenSave = document.getElementById('kunde-save');
kundenSave.addEventListener('click', () => {
  const auftragsnr = document.getElementById('auftrag');
  //Hohlt die Auftragsnr.
  if(auftragsnr.value !== '') {
    console.log(auftragsnr.value);
  }
});