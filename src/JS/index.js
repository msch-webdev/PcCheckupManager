//const {app, BrowserWindow, ipcRenderer} = require('electron');
const {ipcRenderer} = require('electron');
const {BrowserWindow} = require('@electron/remote');
const fs = require('fs');
const pfad = require('path');

//Hohlt das Aktuelle Datum
const datum = () => {
  const heute = document.getElementById('datum');
  const date = new Date();
  let monat = date.getMonth() + 1;
  let tag = date.getDate();
  let jahr = date.getFullYear();
  heute.innerText = `${tag}.${monat}.${jahr}`;
};
datum();


// Eventlistener für Button offnet Kunden Vorschau Window
const windowCustomer = document.getElementById('windowCustomer');

windowCustomer.addEventListener('click', function() {
  ipcRenderer.send('openCustomerWindow');
});


// Eventlistener für close Button
document.getElementById("closeWindow").addEventListener("click", function (e) {
  ipcRenderer.send('close');
}); 

// Eventlistener für Vollbild Button
document.getElementById("fullWindow").addEventListener("click", function (e) {
  ipcRenderer.send('fullScreen');
});

// Eventlistener für Minimieren Button
document.getElementById("minimizeWindow").addEventListener("click", function (e) {
  ipcRenderer.send('minimizeWindow'); 
});

// druckvorschau
document.getElementById("pdfView").addEventListener("click", function (e) {
  ipcRenderer.send('pdfView'); 
  window.print();
});









