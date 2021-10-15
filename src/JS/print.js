const {ipcRenderer, dialog} = require('electron');
const fs = require('fs');
const pfad = require('path');
let pfadname = pfad.join(__dirname, "/../data")
//console.log(pfadname);
let customer;


document.getElementById("load").addEventListener("click", function (e) {
  ipcRenderer.send('druck'); 
});

ipcRenderer.on('JSONobjekt', (event, arg) => {
  customer = arg;
  //Todo:offnet & Druckt eine gespeicherte alte datei
  const printWrapper = document.getElementById('print-wrapper');
  printWrapper.innerHTML += `
  <div>
    <span id="date">Datum: ${customer.Date}</span><br/><br/>

    <span id="auftragsnummer">Auftragsnummer: ${customer.Order}</span><br/><br/>

    <div class="VnNn"><span id="vorname">Vorname: ${customer.Vorname}</span><span id="nachname">Nachname: ${customer.Nachname}</span></div><br/>

    <div class="BnPw"><span id="benutzer">Benutzer: ${customer.BenutzerName}</span><span id="passwort">Passwort: ${customer.BenutzerPW}</span></div>
  </div>`;
})

// druckvorschau
document.getElementById("drucken").addEventListener("click", function (e) {
  //ipcRenderer.send('druck'); 
  window.print();
});