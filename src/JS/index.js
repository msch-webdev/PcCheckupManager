const {app, BrowserWindow, ipcRenderer} = require('electron');
const fs = require('fs');
const pfad = require('path');
const os = require('os');
const si = require('systeminformation');

//Hohlt das Aktuelle Datum
const heute = document.getElementById('datum');
const date = new Date();
const datum = (heute) => {
  let monat = date.getMonth() + 1;
  let tag = date.getDate();
  let jahr = date.getFullYear();
  heute.innerText = `${tag}.${monat}.${jahr}`;
  return heute;
};
datum(heute);

//Hohlt die Windows Version und die Update Version

si.osInfo().then(data => {
  const betriebsSystem = document.getElementById('os');
  const builderArr = ['21H1', '20H2', '2004', '1909'];
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
    update = builderArr[0];
  }
  else if(buildVersion == 19042) {
    update = builderArr[1];
  }
  else if(buildVersion == 19041) {
    update = builderArr[2];
  }
  else if(buildVersion == 18363) {
    update = builderArr[3];
  }
  else {
    update = 'n.a.'
  }

  // serial => "00330-51787-78469-AAOEM"
  let serialNr = data.serial;

  // uefi => true
  let uefi = data.uefi;

  betriebsSystem.innerText = `\n ${platt} => ${distr} - ${archi} Bit - \n Update Version: ${buildVersion} ( ${update} ) - UEFI: ${uefi} \n Serien Nr: ${serialNr}`;
});



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
