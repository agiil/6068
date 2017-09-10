// Globaalsed muutujad
var osalejatePuhver; 			// Kõik osalejate andmed, loetud Parse-st
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

// Parse algväärtustamine
Parse.$ = jQuery;
// Rakendus 6068
Parse.initialize("TvhWFqKT1rJ5dgp4syQkgvUxYBVAE6MrYDDEzs5K",
							 "EwWH4WmSQnQwJF0ZQPqU7eVomhc6PmGJteXtuNJO");
							 
var Osalejad = Parse.Object.extend('Osalejad');
	
// Autentimine ja pääsuõigused Hinnete lehel
function SeaAutentimisala() {
	// Class Level Permissions
	// Vt: https://www.parse.com/docs/ios/guide#security-class-level-permissions
	// Priit Parmakson - Read/Write
	// Osaleja (objectId: tqCcGJibAu) - Read
	//
	
	// Kuva kasutajanimi (kui on)
	if (Parse.User.current()) { 
		// Kasutaja on varasemast sisse logitud
		// Kuva kasutaja nimi
		var a = JSON.stringify(Parse.User.current());
		var b = JSON.parse(a);
		console.log('Kasutaja: ' + b.username);
		$('#kasutajanimi').text(b.username).show();
	} else {
		$('#kasutajanimi').hide();				
	}
	
	// Sündmusekäsitleja Sisse/väljalogimisnupule
	$('#logimisnupp').click(function(event) {
		event.preventDefault();
		
		if (Parse.User.current()) {
			//////// Logi välja ////////////////////////////////
			Parse.User.logOut();
			$('#kasutajanimi').hide();
			$('#teateAla').text('Nõuab sisselogimist').addClass('infoteade');
			// Teabe eemaldamine
			osalejatePuhver = [];
			tudengid = [];
			tudengLeitud = false;
			// Hinnete riba eemaldamine
			$('#hinneterida').empty();
			// Nime valiku (ettetrüki) tühjendamine
			$('input.typeahead').typeahead('destroy');
			// Valikuvälja peitmine
			$('#valikuvali').hide();
			// $('.loginupp').blur();
		} else {
			// Kas sisenemisvorm on avatud?
			if ($('#logimisvorm').is(':visible')) {
					// ei reageeri
			} else {
				// Peida logimisnupp
				$('#logimisnupp').hide();
				// Ava sisenemisvorm)
				$('#logimisvorm').toggle();
				$('#logimisvorm .sisene').focus();		
			} 
		}				
	});
	
	// Sündmusekäsitlejad sisenemisvormi Sisene nupule
	$('#sisene').click(function(event) {
		event.preventDefault();
		
		// Võta kasutajanimi ja salasõna vormilt
		var kasutajanimi = $('#login-username').val();
		var salasona = $('#login-password').val();

		// Sisselogimine Parse-s ////////////////////////////////
		Parse.User.logIn(kasutajanimi, salasona, {
			// Edukas sisselogimine
			success: function(user) {
				var a = JSON.stringify(user);
				var b = JSON.parse(a);
				console.log(b.username + ' logis sisse');
				// Kuva kasutaja nimi
				$('#kasutajanimi').text(b.username).show();
				// Sulge sisenemisvorm
				$('#logimisvorm').toggle();
				// Kuva logimisnupp
				$('#logimisnupp').show();
				// Eemalda sisenemiskutse
				$('#teateAla').text('').removeClass('infoteade');
				// Ettevalmistused autenditud kasutajale
				valmistaEtte();
			},
			error: function(user, error) {
				// Kuva veateade
				$("#autentimisala .VEATEADE").html("Vale nimi või salasõna.").show();
			}
		});
		
	});

	// Sündmusekäsitleja sisenemisvormi Katkesta nupule
	$('#katkesta').click(function(event) {
		event.preventDefault();
		// Sule vorm
		$('#logimisvorm').toggle();
		$('#logimisnupp').show();
	});
	
}

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
	// Loe osalejate andmed Parse-st
	var query = new Parse.Query(Osalejad);
	query.ascending('Pnimi');
	query.find({
		success: function(loetudOsalejad) {
			console.log('Loetud ' + loetudOsalejad.length + ' osaleja andmed');
			$('#teateAla').text(loetudOsalejad.length + ' osalejat').addClass('infoteade');
			// Kanna osalejate puhvrisse
			osalejatePuhver = JSON.parse(JSON.stringify(loetudOsalejad));
			// Koosta massiiv tudengid
			osalejatePuhver.forEach(function(osaleja, nr){
				tudengid.push(osaleja.Eesnimi + ' ' + osaleja.Pnimi);
			});
			// Initsialiseeri Typeahead
			$('#valikuvali').typeahead(
				{ source: tudengid,
					afterSelect: tootleValik }
			);
		},
		error: function(viga) {
			console.log('Osalejate lugemine ebaõnnestus. Viga: ' + viga.code + ' ' + viga.message);
			$('#teateAla').text('Lugemine ebaõnnestus').addClass('veateade');
		}
	});									 	
			
}

// Salvesta hinne
function salvestaHinne(osalejaId, hindeNimi, hinne) {
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

// Sea hinde sisestajad/salvestajad
function seaHindeSisestajad() {
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
	$('#valikuvali').show();
	seaEttetrykk(); // Asünkroonne
	koostaHinneterida();
	seaHindeSisestajad();
}
	
////////////////// Alustamine //////////////////////////////
function alusta() {
  
}