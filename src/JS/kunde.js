//const {app, BrowserWindow, ipcRenderer} = require('electron');
//const fs = require('fs');
//const pfad = require('path');
'use strict';
let customer = {};

//Eventlistener zum Speichern der Daten in JSON
const kundenSave = document.getElementById('kunde-save');
kundenSave.addEventListener('click', () => {
  // Cleart die Konsole
  console.clear();

  // Leert das err Array
  const err = [];

  // Hohlt Aktuelles Datum
  const heute = document.getElementById('datum');
  if(heute.innerText !== '') {
    console.log('Datum: ',heute.innerText);
    customer.Date = heute.innerText;
  }
  
  //Hohlt die Auftragsnr.
  const auftragsnr = document.getElementById('auftrag');
  if(auftragsnr.value !== '') {
    console.log('Auftragsnr.: ',auftragsnr.value);
    customer.Order = auftragsnr.value;
  }
  else {
    err.push(auftragsnr);
  }


  //Hohlt den Vornamen
  const vorname = document.getElementById('vorname');
  if(vorname.value !== '') {
    console.log('Vorname: ', vorname.value);
    customer.Vorname = vorname.value;
  }
  else {
    err.push(vorname);
  }

  //Hohlt den Nachnamen
  const nachname = document.getElementById('nachname');
  if(nachname.value !== '') {
    console.log('Nachname: ',nachname.value);
    customer.Nachname = nachname.value;
  }
  else {
    err.push(nachname);
  }

  //Hohlt den Anmelde Namen
  const benutzerName = document.getElementById('benutzerName');
  if(benutzerName.value !== '') {
    console.log('Benutzername: ',benutzerName.value);
    customer.BenutzerName = benutzerName.value;
  }
  else {
    err.push(benutzerName);
  }

  //Hohlt das Anmelde Passwort
  const benutzerPW = document.getElementById('benutzerPW');
  if(benutzerPW.value !== '') {
    console.log('BenutzerPW: ',benutzerPW.value);
    customer.BenutzerPW = benutzerPW.value;
  }
  else {
    err.push(benutzerPW);
  }

  //#########################################################

  //Hohlt die OS daten
  const os = document.getElementById('os');
  if(os.innerText!== '') { 
    console.log('OS: ',os.innerText);
    
    let system = os.children[0].children[0].innerText
    let betriebOs = os.children[0].children[1].innerText
    let update = os.children[0].children[2].innerText
    
    system = system.split(':');
    betriebOs = betriebOs.split(':');
    update = update.split(':');

    customer.System = system[1].trim();
    customer.Os = betriebOs[1].trim();
    customer.Update = update[1].trim();
  }
  else {
    err.push(os);
  }

  //Hohlt die Motherboard daten
  const motherBoard = document.getElementById('motherBoard');
  if(motherBoard.innerText!== '') {
    console.log('Motherboard: ',motherBoard.innerText);

    let board = motherBoard.children[0].children[0].innerText;
    let model = motherBoard.children[0].children[1].innerText;
    let version = motherBoard.children[0].children[2].innerText;
    let bios = motherBoard.children[0].children[3].innerText;

    board = board.split(':');
    model = model.split(':');
    version = version.split(':');
    bios = bios.split(':');
   

    customer.board = board[1].trim();
    customer.model = model[1].trim();
    customer.version = version[1].trim();
    customer.bios = bios[1].trim() + bios[2];

  }
  else {
    err.push(motherBoard);
  }

  // Hohlt die CPU daten
  const cpu = document.getElementById('cpu');
  if(cpu.innerText!== '') {
    console.log('CPU: ',cpu.innerText);

    let cpuModel = cpu.children[0].children[0].innerText;
    let cores = cpu.children[0].children[1].innerText;

    cpuModel = cpuModel.split(':');
    cores = cores.split(':');

    customer.cpuModel = cpuModel[1].trim();
    customer.cores = cores[1].trim();

  }
  else {
    err.push(cpu);
  }

  // Hohlt die Ram daten
  const memoryGb = document.getElementById('ram');
  //const memoryType = document.getElementById('ramtype');
  if(memoryGb.innerText!== '') {
    console.log('RAM: ',memoryGb.innerText);

    let ram = memoryGb.innerText;

    ram = ram.split(':');

    customer.ram = ram[1].trim()
  }
  else {
    err.push(memoryGb);
  }

  // Hohlt die Grafikkarten infos 
  const grafik = document.getElementById('grafik');
  if(grafik.innerText!== '') {
    console.log('Grafik: \n',grafik.innerText);

    let count = grafik.children;

    customer.Gpu = [];

    for (let i = 0; i < count.length; i++) {

      let gpuModel = grafik.children[i].children[0].innerText;
      let gpuRam = grafik.children[i].children[1].innerText;

      gpuModel = gpuModel.split(':');
      gpuRam = gpuRam.split(':');

      customer.Gpu[i] = {GPUmodel : gpuModel[1].trim(), GPUram: gpuRam[1].trim()};
    }
  }
  else {
    err.push(grafik);
  }

  // Hohlt die Festplatten infos 
  const festplatte = document.getElementById('laufwerkeName');

  if(festplatte.innerText!== '') {
    console.log('Festplatten: \n',festplatte.innerText);

    let count = festplatte.children;
    customer.Festplatten = [];

    for (let i = 0; i < count.length; i++) {

      let hdName = festplatte.children[i].children[0].innerText;
      let hdtype = festplatte.children[i].children[1].innerText;
      let hdInterface = festplatte.children[i].children[2].innerText;


      hdName = hdName.split(':');
      hdtype = hdtype.split(':');
      hdInterface = hdInterface.split(':');

      customer.Festplatten[i] = {HDname : hdName[1].trim(), HDtype: hdtype[1].trim(), HDinterface: hdInterface[1].trim()};
      
    }

  }
  else {
    err.push(festplatte);
  }

  // Hohlt die Laufwerks infos 
  const laufwerke = document.getElementById('laufwerke');
  if(laufwerke.innerText!== '') {
    console.log('Laufwerke: \n',laufwerke.innerText);

    let count = laufwerke.children;
    customer.Laufwerke = [];

    for (let i = 0; i < count.length; i++) {

      let lwName = laufwerke.children[i].children[0].innerText;
      let lwFree = laufwerke.children[i].children[1].innerText;
      let lwFull = laufwerke.children[i].children[2].innerText;

      customer.Laufwerke[i] = {Path : lwName[0].trim(), Free: lwFree, Full: lwFull};

    }
  }
  else {
    err.push(laufwerke);
  }

  //#########################################################

  // Hohlt die Windows Updates
  const osUpdate = document.getElementById('winUpdates');
  if(osUpdate.value !== '') {
    console.log('Windows Update: ',osUpdate.value, 'Aktualisierungen');
    customer.OsUpdate = osUpdate.value;
  }
  else {
    err.push(osUpdate);
  }

  // Hohlt die schadsoftware Funde
  const schadsoftware = document.getElementById('schadsoftware');
  if(schadsoftware.value !== '') {
    console.log('schadsoftware: ',schadsoftware.value,'Funde');
    customer.Schadsoftware = schadsoftware.value;
  }
  else {
    err.push(schadsoftware);
  }

  // Hohlt die Viren Funde
  const virenCheck = document.getElementById('virenCheck');
  if(virenCheck.value !== '') {
    console.log('virenCheck: ',virenCheck.value,'Funde');
    customer.VirenCheck = virenCheck.value;
  }
  else {
    err.push(virenCheck);
  }

  // Hohlt die CCleaner Bereinigung 
  const ccleanerB = document.getElementById('ccleanerB');
  if(ccleanerB.value !== '') {
    console.log('ccleanerB: ',ccleanerB.value,'MB');
    customer.CcleanerB = ccleanerB.value;
  }
  else {
    err.push(ccleanerB);
  }

  // Hohlt die CCleaner Registry 1
  const ccleanerR1 = document.getElementById('ccleanerR1');
  if(ccleanerR1.value !== '') {
    console.log('ccleanerR1: ',ccleanerR1.value,'Registry Funde');
    customer.CcleanerR1 = ccleanerR1.value;
  }
  else {
    err.push(ccleanerR1);
  }

  // Hohlt die CCleaner Registry 1
  const ccleanerR2 = document.getElementById('ccleanerR2');
  if(ccleanerR2.value !== '') {
    console.log('ccleanerR2: +',ccleanerR2.value);
    customer.CcleanerR2 = ccleanerR2.value;
  }
  else {
    err.push(ccleanerR2);
  }

  // Hohlt die CCleaner Registry 1
  const ccleanerR3 = document.getElementById('ccleanerR3');
  if(ccleanerR3.value !== '') {
    console.log('ccleanerR3: +',ccleanerR3.value);
    customer.CcleanerR3 = ccleanerR3.value;
  }
  else {
    err.push(ccleanerR3);
  }

  // Hohlt die Systembereinigung 1
  const systembereinigung1 = document.getElementById('1systembereinigung');
  if(systembereinigung1.value !== '') {
    console.log('1. systembereinigung',systembereinigung1.value);
    customer.Systembereinigung1 = systembereinigung1.value;
  }
  else {
    err.push(systembereinigung1);
  }

  // Hohlt die Systembereinigung 2
  const systembereinigung2 = document.getElementById('2systembereinigung');
  if(systembereinigung2.value !== '') {
    console.log('2. systembereinigung',systembereinigung2.value);
    customer.Systembereinigung2 = systembereinigung2.value;
  }
  else {
    err.push(systembereinigung2);
  }

  // Hohlt hochdruck checkbox
  const hochdruck = document.getElementById('hochdruck');
  if(hochdruck.checked === true) {
    console.log('Hochdruck ',hochdruck.value);
    customer.Hochdruck = hochdruck.value;
  }
  else {
    err.push(hochdruck);
    console.log('Keine Hochdruck Reinigung ',hochdruck.checked);
  }

  // Hohlt Gereinigt checkbox
  const gereinigt = document.getElementById('gereinigt');
  if(gereinigt.checked === true) {
    console.log('Gereinigt ',gereinigt.value);
    customer.Gereinigt = gereinigt.value;
  }
  else {
    err.push(gereinigt);
    console.log('Nicht Gereinigt ',gereinigt.checked);
  }

  // Hohlt den Inhalt der Textarea
  const auffäligkeiten = document.getElementById('auffäligkeiten');
  if(auffäligkeiten.value !== '') {
    console.log('Auffäligkeiten ',auffäligkeiten.value);
    customer.Auffäligkeiten = auffäligkeiten.value;
  }
  else {
    err.push(auffäligkeiten);
  }

  
  //#########################################################

  // Prüft die RadioButtons => lüftergeräusch
  const lüftergeräusch = document.getElementsByName('lueftergeraeusch');

  if(lüftergeräusch[0].checked === true) {
    console.log('Lüftergeräusche ',lüftergeräusch[0].value);
    customer.Lüftergeräusch = lüftergeräusch[0].value;
  }
  else if(lüftergeräusch[1].checked === true) {
    console.log('Lüftergeräusche ',lüftergeräusch[1].value);
    customer.Lüftergeräusch = lüftergeräusch[1].value;
  }
  else {
    err.push(lüftergeräusch[0].parentElement);
    console.log('Lüftergeräusche auswählen');
  }

  // Prüft die RadioButtons => powerLed
  const powerLed = document.getElementsByName('powerLed');

  if(powerLed[0].checked === true) {
    console.log('Power Led ',powerLed[0].value);
    customer.PowerLed = powerLed[0].value;
  }
  else if(powerLed[1].checked === true) {
    console.log('Power Led ',powerLed[1].value);
    customer.PowerLed = powerLed[1].value;
  }
  else {
    err.push(powerLed[0].parentElement);
    console.log('Power Led auswählen');
  }

  // Prüft die RadioButtons => cpuRam
  const cpuRam = document.getElementsByName('cpuRam');

  if(cpuRam[0].checked === true) {
    customer.CpuRam = cpuRam[0].value;
    console.log('CPU/Ram ',cpuRam[0].value);
  }
  else if(cpuRam[1].checked === true) {
    customer.CpuRam = cpuRam[1].value;
    console.log('CPU/Ram ',cpuRam[1].value);
  }
  else {
    err.push(cpuRam[0].parentElement);
    console.log('CPU/Ram auswählen');
  }

  // Prüft die RadioButtons => hdSsd
  const hdSsd = document.getElementsByName('hdSsd');

  if(hdSsd[0].checked === true) {
    customer.HdSsd = hdSsd[0].value;
    console.log('HD/SSD/SSDSsd ',hdSsd[0].value);
  }
  else if(hdSsd[1].checked === true) {
    customer.HdSsd = hdSsd[1].value;
    console.log('HD/SSD ',hdSsd[1].value);
  }
  else {
    err.push(hdSsd[0].parentElement);
    console.log('HD/SSD auswählen');
  }

  // Prüft die RadioButtons => winAktiv
  const winAktiv = document.getElementsByName('winAktiv');

  if(winAktiv[0].checked === true) {
    console.log('Windows Aktiv ',winAktiv[0].value);
    customer.winAktiv = winAktiv[0].value;
  }
  else if(winAktiv[1].checked === true) {
    console.log('Windows Aktiv ',winAktiv[1].value);
    customer.winAktiv = winAktiv[1].value;
  }
  else {
    err.push(winAktiv[0].parentElement);
    console.log('Windows Aktiv auswählen');
  }

  // Prüft die RadioButtons => gerät
  const gerät = document.getElementsByName('gerät');

  if(gerät[0].checked === true) {
    console.log('Gerätemanager ',gerät[0].value);
    customer.Gerät = gerät[0].value;
  }
  else if(gerät[1].checked === true) {
    console.log('Gerätemanager ',gerät[1].value);
    customer.Gerät = gerät[1].value;
  }
  else {
    err.push(gerät[0].parentElement);
    console.log('Gerätemanager auswählen');
  }

  // Prüft die RadioButtons => frontSound
  const frontSound = document.getElementsByName('frontSound');

  if(frontSound[0].checked === true) {
    console.log('FrontSound ',frontSound[0].value);
    customer.FrontSound = frontSound[0].value;
  }
  else if(frontSound[1].checked === true) {
    console.log('FrontSound ',frontSound[1].value);
    customer.FrontSound = frontSound[1].value;
  }
  else {
    err.push(frontSound[0].parentElement);
    console.log('FrontSound auswählen');
  }

  // Prüft die RadioButtons => rearSound
  const rearSound = document.getElementsByName('rearSound');

  if(rearSound[0].checked === true) {
    console.log('RearSound ',rearSound[0].value);
    customer.RearSound = rearSound[0].value;
  }
  else if(rearSound[1].checked === true) {
    console.log('RearSound ',rearSound[1].value);
    customer.RearSound = rearSound[1].value;
  }
  else {
    err.push(rearSound[0].parentElement);
    console.log('RearSound auswählen');
  }

  // Prüft die RadioButtons => frontUSB
  const frontUSB = document.getElementsByName('frontUSB');

  if(frontUSB[0].checked === true) {
    console.log('Front-USB ',frontUSB[0].value);
    customer.FrontUSB = frontUSB[0].value;
  }
  else if(frontUSB[1].checked === true) {
    console.log('Front-USB ',frontUSB[1].value);
    customer.FrontUSB = frontUSB[1].value;
  }
  else {
    err.push(frontUSB[0].parentElement);
    console.log('Front-USB auswählen');
  }

  // Prüft die RadioButtons => rearUSB
  const rearUSB = document.getElementsByName('rearUSB');

  if(rearUSB[0].checked === true) {
    console.log('Rear-USB ',rearUSB[0].value);
    customer.RearUSB = rearUSB[0].value;
  }
  else if(rearUSB[1].checked === true) {
    console.log('Rear-USB ',rearUSB[1].value);
    customer.RearUSB = rearUSB[1].value;
  }
  else {
    err.push(rearUSB[0].parentElement);
    console.log('Rear-USB auswählen');
  }

  // Prüft die RadioButtons => cdDVD
  const cdDVD = document.getElementsByName('cdDVD');

  if(cdDVD[0].checked === true) {
    console.log('CD/DVD ',cdDVD[0].value);
    customer.CdDVD = cdDVD[0].value;
  }
  else if(cdDVD[1].checked === true) {
    console.log('CD/DVD ',cdDVD[1].value);
    customer.CdDVD = cdDVD[1].value;
  }
  else {
    err.push(cdDVD[0].parentElement);
    console.log('CD/DVD auswählen');
  }

  // Prüft die RadioButtons => lan
  const lan = document.getElementsByName('lan');

  if(lan[0].checked === true) {
    console.log('LAN ',lan[0].value);
    customer.Lan = lan[0].value;
  }
  else if(lan[1].checked === true) {
    console.log('LAN ',lan[1].value);
    customer.Lan = lan[1].value;
  }
  else {
    err.push(lan[0].parentElement);
    console.log('LAN auswählen');
  }

  // Prüft die RadioButtons => lan
  const wlan = document.getElementsByName('wlan');

  if(wlan[0].checked === true) {
    console.log('WLAN ',wlan[0].value);
    customer.Wlan = wlan[0].value;
  }
  else if(wlan[1].checked === true) {
    console.log('WLAN ',wlan[1].value);
    customer.Wlan = wlan[1].value;
  }
  else {
    err.push(wlan[0].parentElement);
    console.log('WLAN auswählen');
  }

  console.log(customer);

  const pfad = `src/data/${auftragsnr.value}.json`;
  
  if(err.length < 1) {
    console.log('alles ok')
    const jsonData = JSON.stringify(customer, null, 2);
    fs.writeFile(pfad, jsonData, (err, result) => {
      if(err) console.log('error', err);
    });

  }
  else {
    console.log('Error Array => ', err);
    alert('Oha da wurden Felder nicht ausgefüllt');
    
  }

});
