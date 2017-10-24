---
permalink: ROBO
---

````
/*
- Gmail teenus: https://developers.google.com/apps-script/reference/gmail/
- Regex exec(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec 
*/

var tooLeht = SpreadsheetApp.getActiveSheet();
var aadressileht = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('AADRESSID');
tudengeidKokku = 80;

function saadaKiri() {
  var aadressid = aadressileht.getDataRange().getValues();
  var keha = 'Tere! Aitan õppejõudul ettekantud tööde arvestust pidada.' + 
    ' Vahekokkuvõttega saate tutvuda ' + 
    'https://docs.google.com/a/tlu.ee/spreadsheets/d/1Gqi8Art_AA1Q-sAdj7z5EATPs43NtpJ_JA2A9EIuc_Q/edit?usp=sharing. ' +
    'Minu endaga: https://agiil.github.io/6068/ROBO. Terv! ROBO' ;
  for (var i = 0; i < 1 /* aadressid.length */; i++) {
     MailApp.sendEmail('priit.parmakson@gmail.com' /* aadressid[i] */ ,
       "IFI 6068 Sissejuhatus infosüsteemidesse VAHEKOKKUVÕTE",
       keha);
  } 
    
}  

function koguAadressid() {
/*
  Käib läbi postkasti ja kogub saatjate aadressid lehele AADRESSID.
*/
  var aadressid = [];
  var loimed = GmailApp.getInboxThreads();
  for (var i = 0; i < loimed.length; i++) {
    var loimekirjad = loimed[i].getMessages();
    for (var j = 0; j < loimekirjad.length; j++) {
      var kiri = loimekirjad[j];
      var aadress = kiri.getFrom();
      var esineb = false;
      for (var k = 0; k < aadressid.length; k++) {
        if (aadress == aadressid[k]) {
          esineb = true;
          break;
        }
      }
      if (!esineb) {
        aadressid.push(aadress); 
      }
    }
  }
  // Salvesta aadressid töölehele
  for (var k = 0; k < aadressid.length; k++) {
    aadressileht.getRange(k + 1, 1).setValue(aadressid[k]);
  }
}

function registreeri() {
/*
  Vaatab läbi postkasti ja registreerib ettekantud tööd.
*/
  puhastaTabel(); 
  var loimed = GmailApp.getInboxThreads();
  for (var i = 0; i < loimed.length; i++) {
    var loimekirjad = loimed[i].getMessages();
    for (var j = 0; j < loimekirjad.length; j++) {
      var kiri = loimekirjad[j];
      if (!kiri.isUnread()) {
        var teemarida = kiri.getSubject();
        var ylNr = leiaYlesandeNr(teemarida);
        if (ylNr > 0) {
          leiaTudengid(teemarida, ylNr);
        }
      }
    }
  }
}  

function puhastaTabel() {
  for (var i = 1; i <= tudengeidKokku; i++) {
    tooLeht.getRange(i + 1, 4, 80, 12).setValue('');
  }
}

function leiaTudengid(teemarida, ylNr) {
  var perenimed = leiaPerenimed();
  var c = 0;
  var i = 0;
  do {
    if (teemarida.indexOf(perenimed[i]) >= 0) {
      c = c + 1;
      kannaSisse(i, perenimed[i], ylNr);
    }
    i = i + 1;
  }
  while (i < perenimed.length && c < 5);
}

function kannaSisse(i, perenimi, ylNr) {
  // Logger.log(i.toString() + ' ' + perenimi + ' ' + ylNr.toString());
  tooLeht.getRange(i + 2, ylNr + 3).setValue('A');
}

function leiaYlesandeNr(teemarida) {
  var otsimuster = /ÜL.*?\s(\d)/i
  var otsitulemus = otsimuster.exec(teemarida.toUpperCase());
  if (otsitulemus == null) {
    return 0;
  } else {
    return parseInt(otsitulemus[1]);
  }
}  

function leiaPerenimed() {
  var andmed = tooLeht.getDataRange().getValues();
  var perenimed = [];
  for (var i = 1; i < andmed.length; i++) {
    perenimed.push(andmed[i][2]);
  } 
  return perenimed;
}
````