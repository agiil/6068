// Globaalsed muutujad
var tudengitePuhver; 			// Kõik tudengite andmed, loetud Google Sheet-lt
var tudengid = []; 				// Massiiv nimedest kuvamiseks ettetrükis
var tudengLeitud = false; // Kas tudeng on valitud
var tudengiNr; 						// Valitud tudengi kirje nr massiivis tudengid (baas 0)
var ylNimetus = [  				// Massiiv ülesannete nimetustest (tekstid)
	'Info kvaliteedi hindamine',
	'Infovajaduste väljaselgitamine',
	'Äriprotsessi modelleerimine (IDEF0)',
	'Äriprotsessi modelleerimine (Swimlanes)',
	'Parendamise ja IT toetuse võimaluste leidmine protsessis',
	'Infotehnoloogiline modelleerimine maatriksite abil',
	'Arendusettepaneku tasuvuse hindamine',
	'Süsteemi arhitektuuri kavandamine',
	'Infosüsteemi prototüüpimine',
	'Kontseptuaalse mudeli koostamine',
	'Nõuete dokumendi koostamine',
	'Infosüsteemi arenduse plaanimine'
];
var autenditud = false; // Kas kasutaja on Google Sign-In teenuse abil autenditud
/* Google Sign-In funktsioon, millega saab salvestamisel
pärida ID token-i */
var kasutaja;

function tootleTudengiValik(valitudNimi) {
	// Kustuta eelmine teade
	$('#teateAla').text('').removeClass('infoteade veateade');
	// Leia valitud nimile vastav kirje
	for (var i = 0; i < tudengitePuhver.length; i++) {
		if ((tudengitePuhver[i].Eesnimi + ' ' + tudengitePuhver[i].Perenimi) ==
				valitudNimi) {
			 tudengLeitud = true; 
			 tudengiNr = i;
			 break;
		 }
	}
	if (tudengLeitud) {
		// Kuva tudengi hinded
		for (var j = 1; j <= 12; j++) {
			var ylNr = 'Y' + j.toString();
      if ((tudengitePuhver[tudengiNr].Hinded[ylNr]) &&
          (tudengitePuhver[tudengiNr].Hinded[ylNr] !== null) &&
					(tudengitePuhver[tudengiNr].Hinded[ylNr].length > 0)) {
				$('#' + ylNr).text('check_circle')
				.removeClass('mitteaktiivne').addClass('aktiivne');				
			}
			else {
				$('#' + ylNr).text('panorama_fish_eye')
				.removeClass('aktiivne').addClass('mitteaktiivne');				
			}
		}
	}
	else {
		$('#teateAla').text('Sisemine viga').addClass('veateade');
	} 
}

function seaEttetrykk() {
	/* Loe tudengite andmed Google Sheet-lt */
  var url = 'https://script.google.com/macros/s/AKfycby1_Xu7BX3iae0AFFfsgD2aH3RabwkniX9Bqu31POJwFbSmmUc/exec';
  $.get(url,
    function (data, status, xhr) {
      // Töötle jQuery vastus
      if (status !== 'success') {
        $('#teateAla')
          .text('Salvestatud hinnete lugemine ebaõnnestus. Status: ' + status)
          .addClass('infoteade');
        return
      }
      tudengitePuhver = data.KoigiHinded;
      // Teata, mitme tudengi andmed loeti
      $('#teateAla')
        .text(tudengitePuhver.length + ' tudengit')
        .addClass('infoteade');
      // Koosta massiiv tudengid
      tudengitePuhver.forEach(function(tudeng, nr){
        tudengid.push(tudeng.Eesnimi + ' ' + tudeng.Perenimi);
      });
      // Initsialiseeri Typeahead
      $('#valikuvali').typeahead(
        { source: tudengid,
          afterSelect: tootleTudengiValik }
      );
    }
  ); 
}

function salvestaHinne(tudengiID, hindeNimi, hinne) {
  /* Salvesta hinne
  */
	console.log('Salvesta tudengiID: ' + tudengiID + ' ' + 
		hindeNimi + ': ' + hinne);
	
	var query = new Parse.Query(Osalejad);
	query.get(tudengiID, {
		success: function(osaleja) {
			osaleja.set(hindeNimi, hinne);
			osaleja.save(null, {
				success: function(osaleja) {
					console.log('Hinne salvestatud.');
					$('#teateAla').text('Salvestatud').addClass('infoteade');
				},
				error: function(osaleja, error) {
					console.log('Hinde salvestamine ebaõnnestus: ' + error.message);
					$('#teateAla').text('Salvestamine ebaõnnestus').addClass('veateade');
				}
			});
		},
		error: function(object, error) {
			console.log('Hinde salvestamine ebaõnnestus: ' + error.message);
			$('#teateAla').text('Salvestamine ebaõnnestus').addClass('veateade');
		}
	});

}

function seaHindeSisestajad() {
  /* Sea hinde sisestajad/salvestajad
	   Hindesisestamine ainult konkreetsele inimesele
  */
  for (var i = 1; i <= 12; i++) {
    // Sea hinde sisestaja/salvestaja
    $('#Y' + i.toString())
    .on('click', function(){
      // Ainult siis, kui tudeng on valitud
      if (tudengLeitud) {
        // Pööra väärtus vastupidiseks
        // Kasutame ikooni id ja tudengitePuhvris hoitava väärtuse nime samasust
        var ylNr = this.id;
        var hinne;
        if ((tudengitePuhver[tudengiNr][ylNr]) && 
            (tudengitePuhver[tudengiNr][ylNr].length > 0)) {
          $('#' + ylNr).text('panorama_fish_eye')
          .removeClass('aktiivne').addClass('mitteaktiivne');
          hinne = '';
        }
        else {
          $('#' + ylNr).text('check_circle')
          .removeClass('mitteaktiivne').addClass('aktiivne');
          hinne = 'E';
        }
        // Salvesta kohe muudetud kirje
        tudengitePuhver[tudengiNr][ylNr] = hinne;
        var tudengiID = tudengitePuhver[tudengiNr]['objectId'];
        salvestaHinne(tudengiID, ylNr, hinne);
      }
    });
  }		
}

function koostaHinneterida() {
  /* Koosta hinneterida
    Vt http://stackoverflow.com/questions/3642035/jquerys-append-not-working-with-svg-element
  */
	for (var i = 1; i <= 12; i++) {
		$('#hinneterida')
		.append('<i id="Y' + i.toString() + '" class="ikoon mitteaktiivne material-icons">panorama_fish_eye</i>');
			
		// Sea ülesande teksti kuvaja
		$('#Y' + i.toString())
		.mouseenter(function(){
			// Leia ülesande number
			var ylNr = parseInt(this.id.slice(1)); // Eemalda 'Y'
			$('#ylNimetus').text(ylNr + ' ' + ylNimetus[ylNr-1]);
		})
		.mouseleave(function(){
			$('#ylNimetus').text('');				
		});
					
	}
}

function valmistaEtte() {
  seaHindeSisestajad();
}

////////////////// Alustamine //////////////////////////////
function alusta() {
  seaEttetrykk(); // Asünkroonne
  koostaHinneterida();

}