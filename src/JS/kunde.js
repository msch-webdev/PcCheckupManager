'use strict';

const { jsPDF } = require("jspdf");

// Leert das err Array
let err = [];

//Eventlistener zum Speichern der Daten in JSON
const kundenSave = document.getElementById('kunde-save');

kundenSave.addEventListener('click', () => {  
  //für jsPDF
  // erstellt neues PDF document
  const doc = new jsPDF();
  doc.setFontSize(25);
  doc.text("ordana Checkup", 105, 20,  "center");
  doc.line(70,21,140,21);

  // Schriftgroesse
  const fontSize = 10;
  doc.setFontSize(fontSize);

  // Zeilenhoehe
  let yZeileLeft = 0;

  // Hohlt Aktuelles Datum
  const heute = document.getElementById('datum');
  if(heute.innerText !== '') {
    doc.text(`Datum: ${heute.innerText}`, 100, 30);
  }
  
  //Hohlt die Auftragsnr.
  const auftragsnr = document.getElementById('auftrag');

  if(auftragsnr.value !== '') {
    auftragsnr.classList.remove("error");
    doc.text(`Auftragsnr.: ${auftragsnr.value}`, 10, 30, "left");
  }
  else {
    err.push(auftragsnr);
    auftragsnr.setAttribute( 'class', 'error' );
  }

  //Hohlt den Anmelde Namen
  const benutzerName = document.getElementById('benutzerName');

  if(benutzerName.value === '') {
    benutzerName.value = '';
    benutzerName.setAttribute( 'class', 'error2' );
    doc.text(`Benutzer: ${benutzerName.value}`, 10, 35, "left");
  }
  else if(benutzerName.value !== '') {
    benutzerName.classList.remove("error");
    doc.text(`Benutzer: ${benutzerName.value}`, 10, 35, "left");
  }

  //Hohlt das Anmelde Passwort
  const benutzerPW = document.getElementById('benutzerPW');

  if(benutzerPW.value === '') {
    benutzerPW.value = '';
    benutzerPW.setAttribute( 'class', 'error2' );
    doc.text(`Passwort: ${benutzerPW.value}`, 100, 35);
  }
  else if(benutzerPW.value !== '') {
    benutzerPW.classList.remove("error");
    doc.text(`Passwort: ${benutzerPW.value}`, 100, 35);
  }

  doc.line(10,38,200,38);

  //#########################################################
  // HARDWARE
  doc.setFontSize(16);
  doc.text("Hardware:", 10, 45, "left");
  doc.line(10,46,35,46);

  doc.setFontSize(fontSize);
  //Hohlt die OS daten

  yZeileLeft = 52;
  const os = document.getElementById('os');
  if(os.innerText !== '') {
    os.classList.remove("error");
    
    let betriebOs = os.children[0].children[1].innerText
    let update = os.children[0].children[2].innerText
    // betriebOs = betriebOs.split(':');
    // update = update.split(':');
    doc.setFont("carlito","bold");
    doc.text(`Betriebssystem:`, 10, yZeileLeft); // 52
    doc.setFont("carlito","normal");

    doc.text(`${betriebOs}`, 10, yZeileLeft += 5); // 57
    doc.text(`${update}`, 10, yZeileLeft += 5); // 62
  }
  else {
    err.push(os);
    os.setAttribute( 'class', 'error' );
  }

  //Hohlt die Motherboard daten
  const motherBoard = document.getElementById('motherBoard');
  if(motherBoard.innerText !== '') {
    motherBoard.classList.remove("error");

    let board = motherBoard.children[0].children[0].innerText;
    let model = motherBoard.children[0].children[1].innerText;
    let version = motherBoard.children[0].children[2].innerText;
    let bios = motherBoard.children[0].children[3].innerText;
    
    doc.setFont("carlito","bold");
    doc.text(`Motherboard:`, 10, yZeileLeft += 8); // 70
    doc.setFont("carlito","normal");

    doc.text(`${board}`, 10, yZeileLeft += 5); // 75
    doc.text(`${model}`, 10, yZeileLeft += 5);// 80
    doc.text(`${version}`, 10, yZeileLeft += 5);// 85
    doc.text(`${bios}`, 10, yZeileLeft += 5); // 90

  }
  else {
    err.push(motherBoard);
    motherBoard.setAttribute( 'class', 'error' );
  }

  // Hohlt die CPU daten
  const cpu = document.getElementById('cpu');
  if(cpu.innerText!== '') {
    cpu.classList.remove("error");

    let cpuVendor = cpu.children[0].children[0].innerText;
    let cpuModel = cpu.children[0].children[1].innerText;
    let cores = cpu.children[0].children[2].innerText;

    doc.setFont("carlito","bold");
    doc.text(`CPU:`, 10, yZeileLeft += 7); // 97
    doc.setFont("carlito","normal");

    doc.text(`${cpuVendor}`, 10, yZeileLeft += 5); //102
    doc.text(`${cpuModel}`, 10, yZeileLeft += 5); // 107
    doc.text(`${cores}`, 10, yZeileLeft += 5); // 112
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

    doc.setFont("carlito","bold");
    doc.text(`RAM:`, 10, yZeileLeft += 7);
    doc.setFont("carlito","normal");

    doc.text(`${ram}`, 10, yZeileLeft += 5);
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

    doc.setFont("carlito","bold");
    doc.text(`Grafik:`, 10, yZeileLeft += 7);
    doc.setFont("carlito","normal");

    for (let i = 0; i < count.length; i++) {

      let gpuModel = grafik.children[i].children[0].innerText;
      let gpuRam = grafik.children[i].children[1].innerText;


      doc.text(`${gpuModel}`, 10, yZeileLeft += 5);
      doc.text(`${gpuRam}`, 10, yZeileLeft += 5);
      doc.text(` `, 10, yZeileLeft += 2);
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

    doc.setFont("carlito","bold");
    doc.text(`Laufwerke:`, 10, yZeileLeft += 7);
    doc.setFont("carlito","normal");

    for (let i = 0; i < count.length; i++) {

      let hdName = festplatte.children[i].children[0].innerText;
      let hdtype = festplatte.children[i].children[1].innerText;

      doc.text(`${hdName}`, 10, yZeileLeft += 5);
      doc.text(`${hdtype}`, 10, yZeileLeft += 5);
      doc.text(` `, 10, yZeileLeft += 2);
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

    doc.setFont("carlito","bold");
    doc.text(`Partitionen:`, 10, yZeileLeft += 7);
    doc.setFont("carlito","normal");

    for (let i = 0; i < count.length; i++) {

      let lwName = laufwerke.children[i].children[0].innerText;
      let lwFree = laufwerke.children[i].children[1].innerText;
      let lwFull = laufwerke.children[i].children[2].innerText;

      doc.text(`${lwName} ${lwFree} frei von ${lwFull}`, 10, yZeileLeft += 5);
      doc.text(` `, 10, yZeileLeft += 2);
    }
  }
  else {
    err.push(laufwerke);
    laufwerke.setAttribute( 'class', 'error' )
  }

  //#########################################################
  // Auszuführende Arbeiten
  let yZeileRight = 45;
  doc.setFontSize(16);
  doc.text("Auszuführende Arbeiten:", 100, yZeileRight);
  doc.line(100,46,160,46);

  doc.setFontSize(fontSize);

  doc.text("Schadsoftware Check:",100,yZeileRight += 7);
  doc.text("Unötige Tools entfernt:",100,yZeileRight += 7);
  doc.text("Windows Versions Update:",100,yZeileRight += 20);
  doc.text("CC Bereinigung: ",100,yZeileRight += 7);
  doc.text("CC 1. Registry Check: ",100,yZeileRight += 7);
  doc.text("CC 2. Registry Check: ",100,yZeileRight += 7);
  doc.text("1. + 2. Systembereinigung:",100,yZeileRight += 7);
  doc.text("Windows Updates: ",100,yZeileRight += 7);
  doc.text("Treiber installiert: ",100,yZeileRight += 7);
  doc.text("Gerät innen mit Hochdruck gereinigt: ",100,yZeileRight += 7);
  doc.text("Gerät außen gereinigt: ",100,yZeileRight += 7);
  doc.text("Auffäligkeiten (Kurzbericht) ",100,yZeileRight += 7);

  //#########################################################
  // Endkontrolle

  doc.setFontSize(16);
  doc.text("Endkontrolle:", 100, yZeileRight += 30);
  doc.line(100,yZeileRight += 1,135,yZeileRight);

  doc.setFontSize(fontSize);
  doc.text("Alle Lüfter drehen Geräuschlos: ",100,yZeileRight += 6);
  doc.text("Power/HD in Betrieb LED´s funktionieren: ",100,yZeileRight += 6);
  doc.text("CPU und Speicher werden korrekt erkannt: ",100,yZeileRight += 6);
  doc.text("HD/SSD wird korrekt erkannt: ",100,yZeileRight += 6);
  doc.text("Windows ist aktiviert: ",100,yZeileRight += 6);
  doc.text("Gerätemanager zeigt keine Ausrufezeichen: ",100,yZeileRight += 6);
  doc.text("Front Sound funktioniert: ",100,yZeileRight += 6);
  doc.text("Rear Sound funktioniert: ",100,yZeileRight += 6);
  doc.text("Front USB funktioniert: ",100,yZeileRight += 6);
  doc.text("Rear USB funktioniert: ",100,yZeileRight += 6);
  doc.text("CD/DVD öffnet und liest Medien: ",100,yZeileRight += 6);
  doc.text("LAN Funktioniert: ",100,yZeileRight += 6);
  doc.text("WLAN Funktioniert: ",100,yZeileRight += 6);
  doc.text("Datenschutz: ",100,yZeileRight += 6);
  doc.text("Systemschutz eingerichtet: ",100,yZeileRight += 6);

  doc.text("Check durchgeführt von: ",10,yZeileRight += 28);
  
  
  if(err.length === 0) {

   
    doc.save(`./kunden/${auftragsnr.value}.pdf`);
  }
  else {
    console.log('Error Array => ', err);
    err = [];
  }
});
