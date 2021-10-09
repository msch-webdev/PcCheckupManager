const {app, BrowserWindow, ipcRenderer} = require('electron');
const fs = require('fs');
const pfad = require('path');
const os = require('os');
const si = require('systeminformation');
const hddSpace = require('hdd-space');


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

  betriebsSystem.innerText = `\n ${platt} => ${distr} / ${archi} Bit \n Update Version: ${buildVersion} ( ${update} ) \n Serien Nr: ${serialNr}`;
  //console.log('Betriebssystem => ', betriebsSystem);
});

//Hohlt Daten der CPU
si.cpu().then(data => {
  const cpu = document.getElementById('cpu');
  let manufacturer = data.manufacturer;
  let brand = data.brand;
  let speed = data.speed;
  let cores = data.cores;
  cpu.innerText = `${manufacturer} ${brand} ( ${cores}x ${speed}GHz )`;
  //console.log('CPU => ', cpu);
})

//Hohlt die Ram Informationen
si.mem().then(data => {
  const memoryGb = document.getElementById('ram');
  let totalMemGb = Math.ceil((data.total / (1024 * 1024 * 1024)).toFixed(2));
  memoryGb.innerText = `${totalMemGb}GB`;
});

si.memLayout().then(data => {
  const memoryType = document.getElementById('ramtype');
  let type = data[0].type;
  memoryType.innerText = ` ${type}`;
  //console.log('Memory =>', memoryType);
});

//Prüft welche Grafikkarte verbaut ist
si.graphics().then(data => {
  const grafik = document.getElementById('grafik');
  //console.log(data.controllers);

  for (const karte of data.controllers) {
    let model = karte.model;
    let vram = karte.vram;
    grafik.innerHTML += `<div>Model: ${model} / Speicher: ${vram}</div>`;
  }
  //console.log(grafik)
});

//todo: Prüft ob HD oder SSD verbaut sind und wie viele
si.diskLayout().then(data => {
  const hd = document.getElementById('hd');
  const ssd = document.getElementById('ssd');
  let interfaceType = data;
  console.log(interfaceType);
  //console.log(data[0].name, data[0].type)
  //console.log(data[1].name, data[1].type)
});

si.blockDevices().then(data => {
  console.log(data);
});


hddSpace({ format: 'auto' }, function (info) {
    console.log(info);
    console.log(info.parts[0]);
    console.log(info.parts[1]);
});




// todo: Prüft den Laufwerkspeicher verbrauch für jede platte
