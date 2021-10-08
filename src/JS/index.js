const {app, BrowserWindow, ipcRenderer} = require('electron');
const fs = require('fs');
const pfad = require('path');
const os = require('os');
const si = require('systeminformation');

//Hohlt Daten der CPU
const cpu = document.getElementById('cpu');
si.cpu().then(data => {
  let manufacturer = data.manufacturer;
  let brand = data.brand;
  cpu.value = `${manufacturer} ${brand}`;
  console.log('CPU => ', cpu.value);
})
