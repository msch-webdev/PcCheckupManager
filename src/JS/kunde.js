const {app, BrowserWindow, ipcRenderer} = require('electron');
const fs = require('fs');
const pfad = require('path');


//Eventlistener zum Speichern der Daten in JSON
const kundenSave = document.getElementById('kunde-save');
kundenSave.addEventListener('click', () => {

  // Hohlt Aktuelles Datum
  const heute = document.getElementById('datum');
  if(heute.innerText !== '') {
    console.log('Datum: ',heute.innerText);
  }
  //Hohlt die Auftragsnr.
  const auftragsnr = document.getElementById('auftrag');
  if(auftragsnr.value !== '') {
    console.log('Auftragsnr.: ',auftragsnr.value);
  }
  //Hohlt den Vornamen
  const vorname = document.getElementById('vorname');
  if(vorname.value !== '') {
    console.log('Vorname: ', vorname.value);
  }
  //Hohlt den Nachnamen
  const nachname = document.getElementById('nachname');
  if(nachname.value !== '') {
    console.log('Nachname: ',nachname.value);
  }

  //Hohlt den Anmelde Namen
  const benutzerName = document.getElementById('benutzerName');
  if(benutzerName.value !== '') {
    console.log('Benutzername: ',benutzerName.value);
  }

  //Hohlt das Anmelde Passwort
  const benutzerPW = document.getElementById('benutzerPW');
  if(benutzerPW.value !== '') {
    console.log('BenutzerPW: ',benutzerPW.value);
  }

  //Hohlt die OS daten
  const os = document.getElementById('os');
  if(os.innerText!== '') {
    console.log('OS: ',os.innerText);
  }

  // Hohlt die CPU daten
  const cpu = document.getElementById('cpu');
  if(cpu.innerText!== '') {
    console.log('CPU: ',cpu.innerText);
  }

  // Hohlt die Ram daten
  const memoryGb = document.getElementById('ram');
  const memoryType = document.getElementById('ramtype');
  if(memoryGb.innerText!== '' || memoryType.innerText!== '' ) {
    console.log('RAM: ',memoryGb.innerText, memoryType.innerText);
  }

  // Hohlt die Grafikkarten infos 
  const grafik = document.getElementById('grafik');
  if(grafik.innerText!== '') {
    console.log('Grafik: \n',grafik.innerText);
  }

  // Hohlt die Festplatten infos 
  const festplatte = document.getElementById('laufwerkeName');
  if(festplatte.innerText!== '') {
    console.log('Festplatten: \n',festplatte.innerText);
  }

  // Hohlt die Laufwerks infos 
  const laufwerke = document.getElementById('laufwerke');
  if(laufwerke.innerText!== '') {
    console.log('Laufwerke: \n',laufwerke.innerText);
  }
},{once: true});