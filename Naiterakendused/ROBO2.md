---
permalink: ROBO
---

_Õppejõu abiline ROBO_

## Vastuskirjade saatmine

````javascript
function vastaKiri() {
/*
  Vaatab läbi postkasti saabunud kirjad. Uurib teemarida, üritab tuvastada ülesande numbri ja
  tiimiliikmete perekonnanimed. Saadab kinnituse raporti kättesaamises kohta.
  Vastatud kirjale lisab märgendi VASTATUD. Märgendi abil väldib ka vastuse korduvat saatmist.
  Programm käivitub perioodiliselt. 
*/
  const vaadeldavaidLoimi = 3;
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
          var otsitulemus = otsimuster.exec(teemarida.toUpperCase())[1];
          Logger.log(otsitulemus);
          var tuvastatudNimed = tuvastaNimed(teemarida);
          // Moodusta vastuskirja sisu
          var sisu = 
              'Tere! Mina olen ROBO, õppejõu automaatabiline. Vaatan regulaarselt läbi ' +
                'postkasti ja kinnitan iseseivate tööde raportite kättesaamist. ';  
          if ((otsitulemus === null) && (tuvastatudNimed.length == 0)) { // Ei ole vist raport
            sisu = sisu +
              'Aga see ei ole vist raport. Palun vabandust tülitamise pärast!';
          }
          else {
            var s1;
            if (otsitulemus != null) {
              s1 = 'Vaatan teemarealt, et ülesande nr on ' + otsitulemus + '. ';
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
````