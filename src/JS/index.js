const {app, BrowserWindow, ipcRenderer} = require('electron');
const fs = require('fs');
const pfad = require('path');



//Hohlt das Aktuelle Datum
const datum = () => {
  const heute = document.getElementById('datum');
  const date = new Date();
  let monat = date.getMonth() + 1;
  let tag = date.getDate();
  let jahr = date.getFullYear();
  heute.innerText = `${tag}.${monat}.${jahr}`;
  return heute;
};
datum();










