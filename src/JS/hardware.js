const {app, BrowserWindow, ipcRenderer} = require('electron');
const fs = require('fs');
const pfad = require('path');
const si = require('systeminformation');
const hddSpace = require('hdd-space');

//Eventlistener zum starten der Hardware abfrage
const hardwareBtn = document.getElementById('hardwareBtn');
hardwareBtn.addEventListener('click', () => {
  //Hohlt die Windows Version und die Update Version
  si.osInfo().then(data => {
    console.log('OS => ', data);
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

    betriebsSystem.innerHTML = `<div class="os">
                                  <div>- System: ${platt}</div>
                                  <div>- OS: ${distr} / ${archi} Bit</div>
                                  <div>- Update Version: ${buildVersion} ( ${update} )</div>
                                  <div>- Serien Nr: ${serialNr}</div>
                                </div>`;
  });

  //Hohlt Daten der CPU
  si.cpu().then(data => {
    console.log('CPU => ', data);
    const cpu = document.getElementById('cpu');
    let manufacturer = data.manufacturer;
    let brand = data.brand;
    let speed = data.speed;
    let cores = data.cores;

    cpu.innerHTML = `<div class="cpu">
                      <div>- Hersteller: ${manufacturer}</div>
                      <div>- Model: ${brand}</div>
                      <div>- Cores: ${cores}x ${speed}GHz</div
                     </div>`;
  })

  //Hohlt die Ram Informationen
  si.mem().then(data => {
    console.log('Memory 1 => ', data);
    let totalMemGb = Math.ceil((data.total / (1024 * 1024 * 1024)).toFixed(2));
    si.memLayout().then(data => {
      console.log('Memory 2 => ', data);
      const memoryType = document.getElementById('ram');
      let type = data[0].type;
      memoryType.innerHTML = `<div>- Grösse: ${totalMemGb}GB ${type}</div>`;
    });                 
  });

  //Prüft welche Grafikkarte verbaut ist
  si.graphics().then(data => {
    console.log('Grafikkarten => ', data);
    const grafik = document.getElementById('grafik');

    for (const karte of data.controllers) {
      let model = karte.model;
      let vram = karte.vram;

      grafik.innerHTML += `<div class="grafik">
                            <div>- Model: ${model}</div>
                            <div>- Ram: ${vram}</div
                          </div>`;
    }
  });

  //Prüft Welche Festplatten verbaut wurden & den Speicherverbrauch
  si.diskLayout().then(data => {
    console.log('Laufwerk => ', data);
    const laufwerkeName = document.getElementById('laufwerkeName');
    for (let i = 0; i < data.length; i++) {
      if(data[i].interfaceType !== 'USB') {
        let name = data[i].name;
        let type = "";
        let interfaceInfo = data[i].interfaceType;
        if(data[i].type !== 'SSD') {
          type = "HDD";
        }
        else {
          type = "SSD";
        }

        laufwerkeName.innerHTML += `<div class="cpu">
                                    <div>- Name: ${name}</div>
                                    <div class="tab">- Type: ${type}</div>
                                    <div class="tab">- Interface: ${interfaceInfo}</div
                                  </div>`;
      }
    }
  });

  hddSpace({ format: 'auto' }, function (info) {
    console.log('Laufwerksspeicher => ', info);
    const laufwerke = document.getElementById('laufwerke');
    let letter = '';
    let free = '';
    let size = '';
    
    for (let i = 0; i < info.parts.length; i++) {
      let usb = parseFloat(info.parts[i].size);
      if(usb > 5) {
        letter = info.parts[i].letter;
        free = info.parts[i].free;
        size = info.parts[i].size;
        laufwerke.innerHTML += `<div>- ${letter} ${free} frei von ${size}</div>`;
      }
    };
  });
},{once: true});