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

{% highlight javascript %}
function registreeri() {
/*
  Vaatab läbi postkasti viimased 100 lõime ja registreerib ettekantud tööd.
*/
  // puhastaTabel(); 
  var perenimed = leiaPerenimed();
  var loimed = GmailApp.getInboxThreads();
  for (var i = 0; (i < loimed.length) && (i < 100); i++) {
    var loimekirjad = loimed[i].getMessages();
    for (var j = 0; j < loimekirjad.length; j++) {
      var kiri = loimekirjad[j];
      if (!kiri.isUnread()) {
        var teemarida = kiri.getSubject();
        var ylNr = leiaYlesandeNr(teemarida);
        if (ylNr > 0) {
          leiaTudengidJaKannaSisse(teemarida, ylNr, perenimed);
        }
      }
    }
  }
}{% endhighlight %}

{% highlight javascript %}
function leiaTudengidJaKannaSisse(teemarida, ylNr, perenimed) {
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
{% endhighlight %}

{% highlight javascript %}
function kannaSisse(i, perenimi, ylNr) {
  // Kontrollida, kas märge on juba olemas
  if (tooLeht.getRange(i + 2, ylNr + 3).getValue() !== 'A') {
    Logger.log('Tabelisse kantud: ' + perenimi + ' ' + ylNr.toString());
    tooLeht.getRange(i + 2, ylNr + 3).setValue('A');  
  }
}
{% endhighlight %}

{% highlight javascript %}
function puhastaTabel() {
  for (var i = 1; i <= tudengeidKokku; i++) {
    tooLeht.getRange(i + 1, 4, 80, 12).setValue('');
  }
}{% endhighlight %}

{% highlight javascript %}
function leiaPerenimed() {
  var andmed = tooLeht.getDataRange().getValues();
  var perenimed = [];
  for (var i = 1; i < andmed.length; i++) {
    perenimed.push(andmed[i][2]);
  } 
  return perenimed;
}
{% endhighlight %}

{% highlight javascript %}
function leiaYlesandeNr(teemarida) {
/*
  Kontrollib, kas sõnes teemarida sisaldub ülesande number.
  Number võib olla vahemikus 1..12.
  Kui ei leita, siis tagastab väärtuse 0.
  NB Otsitulemus on massiiv, kus kirjes 0 on vastanud sõne,
  kirjes 1 on esimese grupi väärtus
*/
  var otsimuster = /ÜL.*?(\d{1,2})/i
  var otsitulemus = otsimuster.exec(teemarida.toUpperCase());
  // Logger.log('leiaYlesandeNr: Otsitulemus: ' + otsitulemus);
  var t = 0; // Tagastatav väärtus
  if (otsitulemus == null) {
    t = 0;
  } else {
    var v = parseInt(otsitulemus[1]);
    if (v <= 12) {
      t = v;
    } else {
      t = 0;
    }
  }
  Logger.log('leiaYlesandeNr: Leitud ülesande nr: ' + t.toString());
  return t;
}  
{% endhighlight %}

{% highlight javascript %}
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
{% endhighlight %}

{% highlight javascript %}
function saadaKiri() {
  var aadressid = aadressileht.getDataRange().getValues();
  var keha = 'Tere! Vastan nüüd kõigile kirjadele. Kontrollin, et ülesande number ' +
    'ja tiimiliikmete nimed on teemareal kirjas. Käin postkasti lugemas kord päevas. ' +
    'Kuidas see täpselt käib, vaadake https://agiil.github.io/6068/ROBO2. ' +
    ' lugupidamisega, ROBO'  ;
  for (var i = 0; i < aadressid.length; i++) {
     MailApp.sendEmail(aadressid[i],
       "IFI 6068 VIGA LEITUD!",
       keha);
  }     
}
{% endhighlight %}

{% highlight javascript %}
function vastaKiri() {
/*
  Vaatab läbi postkasti saabunud kirjad. Uurib teemarida, üritab tuvastada ülesande numbri ja
  tiimiliikmete perekonnanimed. Saadab kinnituse raporti kättesaamises kohta.
  Vastatud kirjale lisab märgendi VASTATUD. Märgendi abil väldib ka vastuse korduvat saatmist.
  Programm käivitub perioodiliselt. 
*/
  const vaadeldavaidLoimi = 30;
  const maksKirju = 10; // Veatõkkeks, et programm "hulluks ei läheks".
  var kirjuSaadetud = 0;
  Logger.log('**** vastaKiri ****');
 
  var vastatudM = GmailApp.getUserLabelByName("VASTATUD");
  
  var loimed = GmailApp.getInboxThreads(0, vaadeldavaidLoimi - 1);
  for (var i = 0; i < loimed.length; i++) {
    var loim = loimed[i]; 
    // Kontrolli, kas kiri on juba vastatud
    var loimeMargendid = loim.getLabels();
    var jubaVastatud = false;
    for (var j = 0; j < loimeMargendid.length; j++) {
      if (loimeMargendid[j].getName() == "VASTATUD") {
        jubaVastatud = true;
        break;
      }
    }
    if (!jubaVastatud) { 
      var loimekirjad = loim.getMessages();
      for (var j = 0; j < loimekirjad.length; j++) {
        var kiri = loimekirjad[j];
        if (kiri.isUnread()) {
          var teemarida = kiri.getSubject();
          Logger.log(teemarida);
          var otsimuster = /ÜL.*?(\d)/i
          var otsitulemus = otsimuster.exec(teemarida.toUpperCase());
          Logger.log(otsitulemus);
          var tuvastatudNimed = tuvastaNimed(teemarida);
          // Moodusta vastuskirja sisu
          var sisu = 
              'Tere! Mina olen ROBO, õppejõu automaatabiline. Vaatan regulaarselt läbi ' +
                'postkasti ja kinnitan iseseisvate tööde raportite kättesaamist. ';  
          if ((otsitulemus === null) && (tuvastatudNimed.length == 0)) { // Ei ole vist raport
            sisu = sisu +
              'Aga see ei ole vist raport. Palun vabandust tülitamise pärast!';
          }
          else {
            var s1;
            if (otsitulemus != null) {
              s1 = 'Vaatan teemarealt, et ülesande nr on ' + otsitulemus[1] + '. ';
            } else {
              s1 = 'Vaatan, et teemareal ei ole ülesande numbrit. ';
            }
            var s2;
            if (tuvastatudNimed.length > 0) {
              s2 = 'Teemarealt leian ' + tuvastatudNimed.length.toString() + ' nime: ' + 
                tuvastatudNimed.toString() + '.';
            } else {
              s2 = 'Teemarealt ei leia ühtki nime.';
            }
            sisu = sisu + s1 + s2;
          }  
          // Saada vastuskiri välja
          if (kirjuSaadetud <= maksKirju) {
            MailApp.sendEmail(kiri.getFrom(),
                              "IFI 6068 Kiri kätte saadud", sisu);
            Logger.log('Saadetud vastuskiri: ' + kiri.getFrom() + ' | ' + sisu);
            // Märgi lõim vastatuks
            loim.addLabel(vastatudM);
            kirjuSaadetud++;
          }  
        }
      }
    } // !jubaVastatud  
  }
}  
{% endhighlight %}

{% highlight javascript %}
function tuvastaNimed(teemarida) {
/*
  Tagastab massiivi (võib olla tühi) argumendist leitud perenimedega
*/
  var perenimed = leiaPerenimed(); // Kaaluda refaktoorimist, ebaefektiivne.
  var leitudNimed = [];
  for (var i = 0; i < perenimed.length; i++) {
    if (teemarida.indexOf(perenimed[i]) >= 0) {
      leitudNimed.push(perenimed[i]);
    }
  }
  return leitudNimed;
}
{% endhighlight %}

{% highlight javascript %}
/*
- Gmail teenus: https://developers.google.com/apps-script/reference/gmail/
- Regex exec(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec 
*/

var tooLeht = SpreadsheetApp.getActiveSheet();
var aadressileht = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('AADRESSID');
tudengeidKokku = 80;
{% endhighlight %}
