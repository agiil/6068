// Globaalsed muutujad
var osalejatePuhver; 			// Kõik osalejate andmed, loetud Google Sheet-lt
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

function tootleValik(valitudNimi) {
	// Kustuta eelmine teade
	$('#teateAla').text('').removeClass('infoteade veateade');
	// Valitud tudengi nimi
	for (var i = 0; i < osalejatePuhver.length; i++) {
		if ((osalejatePuhver[i].Eesnimi + ' ' + osalejatePuhver[i].Pnimi) ==
				valitudNimi) {
			 tudengLeitud = true; 
			 tudengiNr = i;
			 break;
		 }
	}
	if (tudengLeitud) {
		// Kuva tudengi andmed
		for (var j = 1; j <= 12; j++) {
			var ylNr = 'Y' + j.toString();
			if ((osalejatePuhver[tudengiNr][ylNr]) && 
					(osalejatePuhver[tudengiNr][ylNr].length > 0)) {
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
		console.log('Valitud tudengi andmeid ei leitud');
		$('#teateAla').text('Sisemine viga').addClass('veateade');
	} 
}

function seaEttetrykk() {
	/* Loe osalejate andmed Google Sheet-lt */
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
      osalejatePuhver = data.KoigiHinded;
      // Teata, mitme osaleja andmed loeti
      $('#teateAla')
        .text(osalejatePuhver.length + ' osalejat')
        .addClass('infoteade');
      // Koosta massiiv tudengid
      osalejatePuhver.forEach(function(osaleja, nr){
        tudengid.push(osaleja.Eesnimi + ' ' + osaleja.Perenimi);
      });
      // Initsialiseeri Typeahead
      $('#valikuvali').typeahead(
        { source: tudengid,
          afterSelect: tootleValik }
      );
    }
  ); 
}

function salvestaHinne(osalejaId, hindeNimi, hinne) {
  /* Salvesta hinne
  */
	console.log('Salvesta osalejaId: ' + osalejaId + ' ' + 
		hindeNimi + ': ' + hinne);
	
	var query = new Parse.Query(Osalejad);
	query.get(osalejaId, {
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
  // Sea hinde sisestajad/salvestajad
	// Hindesisestamine ainult konkreetsele inimesele
	// Korralik teostus oleks rolli Oppejoud kaudu
	if (Parse.User.current() &&
		Parse.User.current().id == 'wkozXvOEhl') {
		for (var i = 1; i <= 12; i++) {
			// Sea hinde sisestaja/salvestaja
			$('#Y' + i.toString())
			.on('click', function(){
				// Sisestada saab ainult õppejõud
				// Ainult siis, kui tudeng on valitud
				if (Parse.User.current() && tudengLeitud) {
					// Pööra väärtus vastupidiseks
					// Kasutame ikooni id ja osalejatePuhvris hoitava väärtuse nime samasust
					var ylNr = this.id;
					var hinne;
					if ((osalejatePuhver[tudengiNr][ylNr]) && 
							(osalejatePuhver[tudengiNr][ylNr].length > 0)) {
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
					osalejatePuhver[tudengiNr][ylNr] = hinne;
					var osalejaId = osalejatePuhver[tudengiNr]['objectId'];
					salvestaHinne(osalejaId, ylNr, hinne);
				}
			});
		}		
	}
}

// Koosta hinneterida
function koostaHinneterida() {
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
	// Vt http://stackoverflow.com/questions/3642035/jquerys-append-not-working-with-svg-element
}

function valmistaEtte() {
  koostaHinneterida();
	seaHindeSisestajad();
}

////////////////// Alustamine //////////////////////////////
function alusta() {
  $('#valikuvali').show();
  seaEttetrykk(); // Asünkroonne

}