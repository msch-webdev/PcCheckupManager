'use strict';const{ipcRenderer}=require('electron');const datum=()=>{const heute=document.getElementById('datum');const date=new Date();let monat=date.getMonth()+1;let tag=date.getDate();let jahr=date.getFullYear();heute.innerText=`${tag}.${monat}.${jahr}`;};datum();const windowCustomer=document.getElementById('windowCustomer');windowCustomer.addEventListener('click',function(){ipcRenderer.send('openCustomerWindow');});








