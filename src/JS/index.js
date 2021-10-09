const {app, BrowserWindow, ipcRenderer} = require('electron');
const fs = require('fs');
const pfad = require('path');
const os = require('os');
const si = require('systeminformation');

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

//Hohlt die Windows Version und die Update Version
si.osInfo().then(data => {
  const betriebsSystem = document.getElementById('os');
  const builderWin = ['21H1', '20H2', '2004', '1909'];
  let update = '';

  // platform => 'linux', 'darwin', 'win32', ...
  let platt = data.platform;

  //distro => Windows 10 Pro
  let distr = data.distro;

  //arch => x64
  let archi = data. arch;

  //build => 19043 => 21H1
  let buildVersion = data.build;
  
  if(buildVersion == 19043) {
    update = builderWin[0];
  }
  else if(buildVersion == 19042) {
    update = builderWin[1];
  }
  else if(buildVersion == 19041) {
    update = builderWin[2];
  }
  else if(buildVersion == 18363) {
    update = builderWin[3];
  }
  else {
    update = 'n.a.'
  }

  // serial => "00330-51787-78469-AAOEM"
  let serialNr = data.serial;

  betriebsSystem.innerText = `\n ${platt} => ${distr} - ${archi} Bit \n Update Version: ${buildVersion} ( ${update} ) \n Serien Nr: ${serialNr}`;
  console.log('Betriebssystem => ', betriebsSystem);
});

//Hohlt Daten der CPU
si.cpu().then(data => {
  const cpu = document.getElementById('cpu');
  let manufacturer = data.manufacturer;
  let brand = data.brand;
  let speed = data.speed;
  let cores = data.cores;
  cpu.innerText = `${manufacturer} ${brand} ( ${cores}x ${speed}GHz )`;
  console.log('CPU => ', cpu);
})

//todo: Hohlt die Ram Informationen
//todo: Prüft ob HD oder SSD verbaut sind und wie viele
//todo: Prüft welche Grafikkarte verbaut ist

// todo: Prüft den Laufwerkspeicher verbrauch für jede platte
