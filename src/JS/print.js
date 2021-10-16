const {ipcRenderer} = require('electron');

let customer;


document.getElementById("load").addEventListener("click", function (e) {
  ipcRenderer.send('druck'); 
});

ipcRenderer.on('JSONobjekt', (event, arg) => {
  customer = arg;
  const printWrapper = document.getElementById('print-wrapper');
  printWrapper.innerHTML += `
  
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
        <h3>Grafikkarte:</h3>`;
    
  
    for (const karte of customer['Gpu']) {
      printWrapper.innerHTML += `
        <span id="GPUmodel">Model: <p>${karte.GPUmodel}</p></span>&nbsp;&nbsp;
        <span id="GPUram">Ram: <p>${karte.GPUram}</p></span><br/>
      </div><div/>`;
    }

  printWrapper.innerHTML += `<div class="HD">
  <h3>Festplatten:</h3>`;

  for (const hd of customer['Festplatten']) {
    printWrapper.innerHTML += `
      <span id="HDname">Name: <p>${hd.HDname}</p></span>&nbsp;&nbsp;
      <span id="HDtype">Model: <p>${hd.HDtype}</p></span>&nbsp;&nbsp;
      <span id="HDinterface">Cores: <p>${hd.HDinterface}</p></span><br/>
    </div>`;
  }

  printWrapper.innerHTML += `<div class="Partition">
  <h3>Partition:</h3>`;

  for (const lw of customer['Laufwerke']) {
    printWrapper.innerHTML += `
      <span id="Partition">Name: <p>${lw.Path}</p><p>${lw.Free}</p> frei von <p>${lw.Full}</p></span><br/>
    </div>`;
  }

  printWrapper.innerHTML += `
  <div id="check-container">
    <div class="arbeiten">
      <span>Windwos Updates: <p>${customer.OsUpdate}</p> Aktualisierungen</span><br/>
      <span>Schadsoftware Check: <p>${customer.Schadsoftware}</p> Funde entfernt</span><br/>
      <span>Viren Check: <p>${customer.VirenCheck}</p> Funde entfernt</span><br/>
      <span>CCleaner Bereinigung: <p>${customer.CcleanerB}</p> MB</span><br/>
      <span>CCleaner Registry: <p>${customer.CcleanerR1}</p> Registry Funde <br/> 
        &nbsp;&nbsp;&nbsp;( 2. Funde <p>${customer.CcleanerR2}</p> - 
                          3. Funde <p>${customer.CcleanerR3}</p> )
      </span><br/>
      <span>1. Systembereinigung: <p>${customer.Systembereinigung1}</p> MB / GB</span><br/>
      <span>2. Systembereinigung: <p>${customer.Systembereinigung2}</p> MB / GB</span><br/>
      <span>Gerät innen mit Hochdruck gereinigt: <p>${customer.Hochdruck}</p></span><br/>
      <span>Gerät außen gereinigt: <p>${customer.Gereinigt}</p></span><br/>
      <span>Auffäligkeiten (Kurzbericht): <p>${customer.Auffäligkeiten}</p></span><br/>
    </div>

    <div class="checks">
    <span>Alle Lüfter drehen Geräuschlos: <p>${customer.luefter}</p></span><br/>
    <span>Power/HD in Betrieb LED´s funktionieren: <p>${customer.PowerLed}</p></span><br/>
    <span>CPU und Speicher werden korrekt erkannt: <p>${customer.CpuRam}</p></span><br/>
    <span>HD/SSD wird korrekt erkannt: <p>${customer.HdSsd}</p></span><br/>
    <span>Windows ist aktiviert: <p>${customer.winAktiv}</p></span><br/>
    <span>Gerätemanager zeigt keine Ausrufezeichen: <p>${customer.Gerät}</p></span><br/>
    <span>Front Sound funktioniert: <p>${customer.FrontSound}</p></span><br/>
    <span>Rear Sound funktioniert: <p>${customer.RearSound}</p></span><br/>
    <span>Front USB funktioniert: <p>${customer.FrontUSB}</p></span><br/>
    <span>Rear USB funktioniert: <p>${customer.RearUSB}</p></span><br/>
    <span>CD/DVD öffnet und liest Medien: <p>${customer.CdDVD}</p></span><br/>
    <span>LAN Funktioniert: <p>${customer.Lan}</p></span><br/>
    <span>WLAN Funktioniert: <p>${customer.Wlan}</p></span><br/>
    </div>
  </div>`;
  
})
