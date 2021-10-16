'use strict';
let customer = {};
const fs = require('fs');

// Leert das err Array
let err = [];

//Eventlistener zum Speichern der Daten in JSON
const kundenSave = document.getElementById('kunde-save');
kundenSave.addEventListener('click', () => {
  // Cleart die Konsole
  //console.clear();
  

  // Hohlt Aktuelles Datum
  const heute = document.getElementById('datum');
  if(heute.innerText !== '') {
    customer.Date = heute.innerText;
  }
  
  //Hohlt die Auftragsnr.
  const auftragsnr = document.getElementById('auftrag');
  if(auftragsnr.value !== '') {
    auftragsnr.classList.remove("error");
    customer.Order = auftragsnr.value;
  }
  else {
    err.push(auftragsnr);
    auftragsnr.setAttribute( 'class', 'error' )
  }

  //Hohlt den Anmelde Namen
  const benutzerName = document.getElementById('benutzerName');
  if(benutzerName.value !== '') {
    benutzerName.classList.remove("error");
    customer.BenutzerName = benutzerName.value;
  }
  else {
    err.push(benutzerName);
    benutzerName.setAttribute( 'class', 'error' )
  }

  //Hohlt das Anmelde Passwort
  const benutzerPW = document.getElementById('benutzerPW');
  if(benutzerPW.value !== '') {
    benutzerPW.classList.remove("error");
    customer.BenutzerPW = benutzerPW.value;
  }
  else {
    err.push(benutzerPW);
    benutzerPW.setAttribute( 'class', 'error' )
  }

  //#########################################################

  //Hohlt die OS daten
  const os = document.getElementById('os');
  if(os.innerText!== '') {
    os.classList.remove("error");
    
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
    os.setAttribute( 'class', 'error' )
  }

  //Hohlt die Motherboard daten
  const motherBoard = document.getElementById('motherBoard');
  if(motherBoard.innerText!== '') {
    motherBoard.classList.remove("error");

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
    motherBoard.setAttribute( 'class', 'error' )
  }

  // Hohlt die CPU daten
  const cpu = document.getElementById('cpu');
  if(cpu.innerText!== '') {
    cpu.classList.remove("error");

    let cpuVendor = cpu.children[0].children[0].innerText;
    let cpuModel = cpu.children[0].children[1].innerText;
    let cores = cpu.children[0].children[2].innerText;

    cpuVendor = cpuVendor.split(':');
    cpuModel = cpuModel.split(':');
    cores = cores.split(':');

    customer.cpuManufacturer = cpuVendor[1].trim();
    customer.cpuModel = cpuModel[1].trim();
    customer.cores = cores[1].trim();

  }
  else {
    err.push(cpu);
    cpu.setAttribute( 'class', 'error' )
  }

  // Hohlt die Ram daten
  const memoryGb = document.getElementById('ram');
  if(memoryGb.innerText!== '') {
    memoryGb.classList.remove("error");

    let ram = memoryGb.innerText;

    ram = ram.split(':');

    customer.ram = ram[1].trim()
  }
  else {
    err.push(memoryGb);
    memoryGb.setAttribute( 'class', 'error' )
  }

  // Hohlt die Grafikkarten infos 
  const grafik = document.getElementById('grafik');
  if(grafik.innerText!== '') {
    grafik.classList.remove("error");
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
    grafik.setAttribute( 'class', 'error' )
  }

  // Hohlt die Festplatten infos 
  const festplatte = document.getElementById('laufwerkeName');

  if(festplatte.innerText!== '') {
    festplatte.classList.remove("error");
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
    festplatte.setAttribute( 'class', 'error' )
  }

  // Hohlt die Laufwerks infos 
  const laufwerke = document.getElementById('laufwerke');
  if(laufwerke.innerText!== '') {
    laufwerke.classList.remove("error");
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
    laufwerke.setAttribute( 'class', 'error' )
  }

  //#########################################################

  // Hohlt die Windows Updates
  const osUpdate = document.getElementById('winUpdates');
  if(osUpdate.value !== '') {
    customer.OsUpdate = osUpdate.value;
    osUpdate.classList.remove("error");
  }
  else {
    err.push(osUpdate);
    osUpdate.setAttribute( 'class', 'error' )
  }

  // Hohlt die schadsoftware Funde
  const schadsoftware = document.getElementById('schadsoftware');
  if(schadsoftware.value !== '') {
    customer.Schadsoftware = schadsoftware.value;
    schadsoftware.classList.remove("error");
  }
  else {
    err.push(schadsoftware);
    schadsoftware.setAttribute( 'class', 'error' )
  }

  // Hohlt die Viren Funde
  const virenCheck = document.getElementById('virenCheck');
  if(virenCheck.value !== '') {
    virenCheck.classList.remove("error");
    customer.VirenCheck = virenCheck.value;
  }
  else {
    err.push(virenCheck);
    virenCheck.setAttribute( 'class', 'error' )
  }

  // Hohlt die CCleaner Bereinigung 
  const ccleanerB = document.getElementById('ccleanerB');
  if(ccleanerB.value !== '') {
    ccleanerB.classList.remove("error");
    customer.CcleanerB = ccleanerB.value;
  }
  else {
    err.push(ccleanerB);
    CcleanerB.setAttribute( 'class', 'error' )
  }

  // Hohlt die CCleaner Registry 1
  const ccleanerR1 = document.getElementById('ccleanerR1');
  if(ccleanerR1.value !== '') {
    ccleanerR1.classList.remove("error");
    customer.CcleanerR1 = ccleanerR1.value;
  }
  else {
    err.push(ccleanerR1);
    CcleanerR1.setAttribute( 'class', 'error' )
  }

  // Hohlt die CCleaner Registry 1
  const ccleanerR2 = document.getElementById('ccleanerR2');
  if(ccleanerR2.value !== '') {
    ccleanerR2.classList.remove("error");
    customer.CcleanerR2 = ccleanerR2.value;
  }
  else {
    err.push(ccleanerR2);
    CcleanerR2.setAttribute( 'class', 'error' )
  }

  // Hohlt die CCleaner Registry 1
  const ccleanerR3 = document.getElementById('ccleanerR3');
  if(ccleanerR3.value !== '') {
    ccleanerR3.classList.remove("error");
    customer.CcleanerR3 = ccleanerR3.value;
  }
  else {
    err.push(ccleanerR3);
    ccleanerR3.setAttribute( 'class', 'error' )
  }

  // Hohlt die Systembereinigung 1
  const systembereinigung1 = document.getElementById('1systembereinigung');
  if(systembereinigung1.value !== '') {
    systembereinigung1.classList.remove("error");
    customer.Systembereinigung1 = systembereinigung1.value;
  }
  else {
    err.push(systembereinigung1);
    systembereinigung1.setAttribute( 'class', 'error' )
  }

  // Hohlt die Systembereinigung 2
  const systembereinigung2 = document.getElementById('2systembereinigung');
  if(systembereinigung2.value !== '') {
    systembereinigung2.classList.remove("error");
    customer.Systembereinigung2 = systembereinigung2.value;
  }
  else {
    err.push(systembereinigung2);
    systembereinigung2.setAttribute( 'class', 'error' )
  }

  // Hohlt hochdruck checkbox
  const hochdruck = document.getElementById('hochdruck');
  if(hochdruck.checked === true) {
    hochdruck.classList.remove("error");
    customer.Hochdruck = hochdruck.value;
  }
  else {
    err.push(hochdruck);
    hochdruck.setAttribute( 'class', 'error' )
  }

  // Hohlt Gereinigt checkbox
  const gereinigt = document.getElementById('gereinigt');
  if(gereinigt.checked === true) {
    gereinigt.classList.remove("error");
    customer.Gereinigt = gereinigt.value;
  }
  else {
    err.push(gereinigt);
    gereinigt.setAttribute( 'class', 'error' )
  }

  // Hohlt den Inhalt der Textarea
  const auffäligkeiten = document.getElementById('auffäligkeiten');
  if(auffäligkeiten.value !== '') {
    auffäligkeiten.classList.remove("error");
    customer.Auffäligkeiten = auffäligkeiten.value;
  }
  else {
    err.push(auffäligkeiten);
    auffäligkeiten.setAttribute( 'class', 'error' )
  }

  
  //#########################################################

  // Prüft die RadioButtons => lüftergeräusch
  const lüftergeräusch = document.getElementsByName('lueftergeraeusch');

  if(lüftergeräusch[0].checked === true) {
    lüftergeräusch.classList.remove("error");
    customer.Lüftergeräusch = lüftergeräusch[0].value;
  }
  else if(lüftergeräusch[1].checked === true) {
    lüftergeräusch.classList.remove("error");
    customer.Lüftergeräusch = lüftergeräusch[1].value;
  }
  else {
    err.push(lüftergeräusch[0].parentElement);
    lüftergeräusch.setAttribute( 'class', 'error' )
  }

  // Prüft die RadioButtons => powerLed
  const powerLed = document.getElementsByName('powerLed');

  if(powerLed[0].checked === true) {
    powerLed.classList.remove("error");
    customer.PowerLed = powerLed[0].value;
  }
  else if(powerLed[1].checked === true) {
    powerLed.classList.remove("error");
    customer.PowerLed = powerLed[1].value;
  }
  else {
    err.push(powerLed[0].parentElement);
    powerLed.setAttribute( 'class', 'error' )
  }

  // Prüft die RadioButtons => cpuRam
  const cpuRam = document.getElementsByName('cpuRam');

  if(cpuRam[0].checked === true) {
    customer.CpuRam = cpuRam[0].value;
    cpuRam.classList.remove("error");
  }
  else if(cpuRam[1].checked === true) {
    cpuRam.classList.remove("error");
    customer.CpuRam = cpuRam[1].value;
  }
  else {
    err.push(cpuRam[0].parentElement);
    cpuRam.setAttribute( 'class', 'error' )
  }

  // Prüft die RadioButtons => hdSsd
  const hdSsd = document.getElementsByName('hdSsd');

  if(hdSsd[0].checked === true) {
    hdSsd.classList.remove("error");
    customer.HdSsd = hdSsd[0].value;
  }
  else if(hdSsd[1].checked === true) {
    hdSsd.classList.remove("error");
    customer.HdSsd = hdSsd[1].value;
  }
  else {
    err.push(hdSsd[0].parentElement);
    hdSsd.setAttribute( 'class', 'error' )
  }

  // Prüft die RadioButtons => winAktiv
  const winAktiv = document.getElementsByName('winAktiv');

  if(winAktiv[0].checked === true) {
    winAktiv.classList.remove("error");
    customer.winAktiv = winAktiv[0].value;
  }
  else if(winAktiv[1].checked === true) {
    winAktiv.classList.remove("error");
    customer.winAktiv = winAktiv[1].value;
  }
  else {
    err.push(winAktiv[0].parentElement);
    winAktiv.setAttribute( 'class', 'error' )
  }

  // Prüft die RadioButtons => gerät
  const gerät = document.getElementsByName('gerät');

  if(gerät[0].checked === true) {
    gerät.classList.remove("error");
    customer.Gerät = gerät[0].value;
  }
  else if(gerät[1].checked === true) {
    gerät.classList.remove("error");
    customer.Gerät = gerät[1].value;
  }
  else {
    err.push(gerät[0].parentElement);
    gerät.setAttribute( 'class', 'error' )
  }

  // Prüft die RadioButtons => frontSound
  const frontSound = document.getElementsByName('frontSound');

  if(frontSound[0].checked === true) {
    frontSound.classList.remove("error");
    customer.FrontSound = frontSound[0].value;
  }
  else if(frontSound[1].checked === true) {
    frontSound.classList.remove("error");
    customer.FrontSound = frontSound[1].value;
  }
  else {
    err.push(frontSound[0].parentElement);
    frontSound.setAttribute( 'class', 'error' )
  }

  // Prüft die RadioButtons => rearSound
  const rearSound = document.getElementsByName('rearSound');

  if(rearSound[0].checked === true) {
    rearSound.classList.remove("error");
    customer.RearSound = rearSound[0].value;
  }
  else if(rearSound[1].checked === true) {
    rearSound.classList.remove("error");
    customer.RearSound = rearSound[1].value;
  }
  else {
    err.push(rearSound[0].parentElement);
    rearSound.setAttribute( 'class', 'error' )
  }

  // Prüft die RadioButtons => frontUSB
  const frontUSB = document.getElementsByName('frontUSB');

  if(frontUSB[0].checked === true) {
    frontUSB.classList.remove("error");
    customer.FrontUSB = frontUSB[0].value;
  }
  else if(frontUSB[1].checked === true) {
    frontUSB.classList.remove("error");
    customer.FrontUSB = frontUSB[1].value;
  }
  else {
    err.push(frontUSB[0].parentElement);
    frontUSB.setAttribute( 'class', 'error' );
  }

  // Prüft die RadioButtons => rearUSB
  const rearUSB = document.getElementsByName('rearUSB');

  if(rearUSB[0].checked === true) {
    rearUSB.classList.remove("error");
    customer.RearUSB = rearUSB[0].value;
  }
  else if(rearUSB[1].checked === true) {
    rearUSB.classList.remove("error");
    customer.RearUSB = rearUSB[1].value;
  }
  else {
    err.push(rearUSB[0].parentElement);
    rearUSB.setAttribute( 'class', 'error' );
  }

  // Prüft die RadioButtons => cdDVD
  const cdDVD = document.getElementsByName('cdDVD');

  if(cdDVD[0].checked === true) {
    cdDVD.classList.remove("error");
    customer.CdDVD = cdDVD[0].value;
  }
  else if(cdDVD[1].checked === true) {
    cdDVD.classList.remove("error");
    customer.CdDVD = cdDVD[1].value;
  }
  else {
    err.push(cdDVD[0].parentElement);
    cdDVD.setAttribute( 'class', 'error' );
  }

  // Prüft die RadioButtons => lan
  const lan = document.getElementsByName('lan');

  if(lan[0].checked === true) {
    lan.classList.remove("error");
    customer.Lan = lan[0].value;
  }
  else if(lan[1].checked === true) {
    lan.classList.remove("error");
    customer.Lan = lan[1].value;
  }
  else {
    err.push(lan[0].parentElement);
    lan.setAttribute( 'class', 'error' );
  }

  // Prüft die RadioButtons => lan
  const wlan = document.getElementsByName('wlan');

  if(wlan[0].checked === true) {
    wlan.classList.remove("error");
    customer.Wlan = wlan[0].value;
  }
  else if(wlan[1].checked === true) {
    wlan.classList.remove("error");
    customer.Wlan = wlan[1].value;
  }
  else {
    err.push(wlan[0].parentElement);
    wlan.setAttribute( 'class', 'error' );
  }


  const pfad = `src/data/${auftragsnr.value}.json`;

  if(err.length === 0) {

    const jsonData = JSON.stringify(customer, null, 2);
    fs.writeFile(pfad, jsonData, (err, result) => {
      if(err) console.log('error', err);
    });

  }
  else {
    console.log('Error Array => ', err);
  }
});
