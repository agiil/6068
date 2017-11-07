---
permalink: ROBO
---

# Õppejõu abiline ROBO

## Arhitektuuri ülevaade

<img src='https://agiil.github.io/6068/img/ROBO.PNG' width='420'>

Joonis 1. ROBO arhitektuur

ROBO on rakendus, mis:
- täidab hindetabelit
- saadab kursusel osalevatele tudengitele e-postiga teavitusi.

ROBO on Google Apps Script-is kirjutatud rakendus. Rakenduse lähtekood on toodud allpool. Oluliste vahenditena kasutab rakendus Google Gmail ja Mail API-sid.

__Hindetabel__. Rakendus on seotud hindetabeliga. Hindetabelis märgitakse iseseisvate tööde (ülesannete lahendamise) tulemused. Hindetabel on Google Docs arvutustabel. Juurdepääs hindetabelile on õppejõul (kõik õigused) ja tudengitel (vaatamis- ja kommenteerimisõigus).

__Isikuandmete kaitse__. Tudengile antakse juurdepääs juhu-URL-ga, mille ROBO saadab tudengile e-postiga. Juhu-URL-i avalikult välja ei panda.

__E-posti aadressid__. ROBO on õppejõud postkastist tuvastanud tudengite e-posti aadressid ja koostanud neist aadressinimistu (vt koodis funktsioon `koguAadressid()`). Tudeng, kelle aadressi ei ole nimistus, peab teavituste saamiseks pöörduma õppejõu poole, kes lisab tudengi aadressi aadressinimistusse.

__Teavitused__. Õppejõud võib ROBO abil saata e-kirja kõigile aadressinimistus olevatele tudengitele (vt koodis funktsioon `saadaKiri()`).

__Töö arvestamise algoritm__. Hindetabelit täites ROBO (vt koodis funktsioon `registreeri()`):
1. käib läbi õppejõu postkasti
2. valib avatud kirjad
3. tuvastab kirja teemarealt ülesande numbri (lähtudes [lahendusaruande vormistamise juhendis](Juhend) sätestatud vormingust `Ül <n>`)
4. tuvastab kirja teemarealt ülesande lahendanud tudengite nimed
5. teeb hindetabelis vastavate tudengite kohta märke, et ülesanne on tehtud.

__Teadaolevad vead ja nõrkused__.
1. ROBO ei käsitle praegu õigesti juhtu, kus praktikumirühmas (või ühes ja teises praktikumirühmas) on kaks sama perekonnanimega tudengit. Vastavate tudengite hinded peab õppejõud märkima käsitsi.
2. Ülesande numbri tuvastamiseks kasutab ROBO regulaaravaldist. Kõiki [lahendusaruande vormistamise juhendis](Juhend) sätestatud vormingust `Ül <n>` kõrvalekaldumisi ei suuda programm siiski ära tunda. Vormistusnõude täitmatajätmisel hinne siiski kaotsi ei lähe. Tudeng peab valesti vormistatud teemarea korral pöörduma õppejõud poole (praktikumi eel või järel), kes kannab hinde sisse.

## Rakenduse lähtekood

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
  var keha = 'Tere! ROBO siin. Olen nüüd natuke targem ja oskan aru saada ka Teie lihtsamatest "kirjavigadest". ' +
    'Näiteks kui kirjutate Ül1, saan aru. Üks viga tekkis ka sellest, et 1. praktikumirühmas' +
    'on HINREK Saar, 2. rühmas aga MARGE Saar. Mina võtan alati esimese nime, mis tabelis ette tuleb!' + 
    'Nime vahetama te ei pea siiski minema. Õppejõud lubas selle ja võimalikud muud asjad järgmise' +
    ' loengu või praktikumi järel koos teiega käsitsi korda seda!' +
      ' lugupidamisega, ROBO'  ;
  for (var i = 0; i < aadressid.length; i++) {
     MailApp.sendEmail(aadressid[i],
       "IFI 6068 VIGA LEITUD!",
       keha);
  }     
}

/* ---- Saadetud kirjad --- 

xx.10.2017 Tere! Näen, et inimesed on mulle kirju saatnud. Vist ROBO ei saanud kõiki töid ' + 
    'tabelisse kirja. Kuidas ROBO intelligentsemaks teha? ROBO kood on siin: ' +
    'https://agiil.github.io/6068/ROBO. Kas teil on ettepanekuid? 

25.10.2017 'Tere! Aitan õppejõudul ettekantud tööde arvestust pidada.' + 
    ' Vahekokkuvõttega saate tutvuda ' + 
    'https://docs.google.com/a/tlu.ee/spreadsheets/d/1Gqi8Art_AA1Q-sAdj7z5EATPs43NtpJ_JA2A9EIuc_Q/edit?usp=sharing. ' +
    'Minu endaga: https://agiil.github.io/6068/ROBO. Terv! ROBO'
*/

function registreeri() {
/*
  Vaatab läbi postkasti ja registreerib ettekantud tööd.
*/
  // puhastaTabel(); 
  var perenimed = leiaPerenimed();
  var loimed = GmailApp.getInboxThreads();
  for (var i = 0; i < loimed.length; i++) {
    var loimekirjad = loimed[i].getMessages();
    for (var j = 0; j < loimekirjad.length; j++) {
      var kiri = loimekirjad[j];
      if (!kiri.isUnread()) {
        var teemarida = kiri.getSubject();
        var ylNr = leiaYlesandeNr(teemarida);
        if (ylNr > 0) {
          leiaTudengid(teemarida, ylNr, perenimed);
        }
      }
    }
  }
}  

function leiaTudengid(teemarida, ylNr, perenimed) {
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
  Logger.log(i.toString() + ' ' + perenimi + ' ' + ylNr.toString());
  tooLeht.getRange(i + 2, ylNr + 3).setValue('A');
}

function leiaYlesandeNr(teemarida) {
  var otsimuster = /ÜL.*?(\d)/i
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

function puhastaTabel() {
  for (var i = 1; i <= tudengeidKokku; i++) {
    tooLeht.getRange(i + 1, 4, 80, 12).setValue('');
  }
}

````