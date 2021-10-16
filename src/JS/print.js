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
    <span id="date">Datum: <p>${customer.Date}</p></span><br/><br/>

    <span id="auftragsnummer">Auftragsnummer: <p>${customer.Order}</p></span><br/><br/>

    <div class="BnPw"><span id="benutzer">Benutzer: <p>${customer.BenutzerName}</p></span><span id="passwort">Passwort: <p>${customer.BenutzerPW}</p></span></div>
    <hr/>
    <div class="betriebssystem">
      <h3>Betriebssystem:</h3>
      <span id="system">System: <p>${customer.System}</p></span>&nbsp;&nbsp;
      <span id="os">OS: <p>${customer.Os}</p></span><br/>
      <span id="os">Update version: <p>${customer.Update}</p></span>
    </div>

    <div class="motherboard">
      <h3>Motherboard:</h3>
      <span id="board">Board: <p>${customer.board}</p></span>&nbsp;&nbsp;
      <span id="model">Model: <p>${customer.model}</p></span>&nbsp;&nbsp;
      <span id="version">Version: <p>${customer.version}</p></span><br/>
      <span id="bios">Bios: <p>${customer.bios}</p></span>
    </div>

    <div class="cpu">
      <h3>CPU:</h3>
      <span id="cpuVendor">Hersteller: <p>${customer.cpuManufacturer}</p></span>&nbsp;&nbsp;
      <span id="model">Model: <p>${customer.cpuModel}</p></span>&nbsp;&nbsp;
      <span id="cores">Cores: <p>${customer.cores}</p></span><br/>
    </div>

    <div class="ram">
      <h3>Ram:</h3>
      <span id="cpuVendor">Grösse: <p>${customer.ram}</p></span>
    </div>

    <div class="gpuCarts">
      <h3>Grafikkarte:</h3>
  </div>`;
  

  for (const karte of customer['Gpu']) {
      printWrapper.innerHTML += `
        <span id="GPUmodel">Model: <p>${karte.GPUmodel}</p></span>&nbsp;&nbsp;
        <span id="GPUram">Ram: <p>${karte.GPUram}</p></span><br/>
      </div>`;
  }

  printWrapper.innerHTML += `</div>`;

  
})


// druckvorschau
document.getElementById("drucken").addEventListener("click", function (e) {
  //ipcRenderer.send('druck'); 
  window.print();
});