const {app, BrowserWindow, ipcRenderer} = require('electron');
const fs = require('fs');
const pfad = require('path');
const os = require('os');
const si = require('systeminformation');

//todo: Hohlt das Aktuelle Datum
//todo: Hohlt die Windows Version und die Update Version

//Hohlt Daten der CPU
const cpu = document.getElementById('cpu');
si.cpu().then(data => {
  let manufacturer = data.manufacturer;
  let brand = data.brand;
  let speed = data.speed;
  let cores = data.cores;
  cpu.value = `${manufacturer} ${brand} ( ${cores}x ${speed}GHz )`;
  console.log('CPU => ', cpu.value);
})

//todo: Hohlt die Ram Informationen
//todo: Prüft ob HD oder SSD verbaut sind und wie viele
//todo: Prüft welche Grafikkarte verbaut ist

// todo: Prüft den Laufwerkspeicher verbrauch für jede platte
