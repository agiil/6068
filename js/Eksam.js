// Globaalsed muutujad
var kysimusi = 2; // Küsimuste arv eksamitöös
/* REST API-t pakkuv Google Sheet, kus hindeid hoitakse. */
var url = 'https://script.google.com/macros/s/AKfycbzykGrxNind0D5zx2-NkooaDLBRCjZfZE_3cnO5KMesAVhinerW/exec';
var autenditud = false; // Kas kasutaja on Google Sign-In teenuse abil autenditud
/* Google Sign-In funktsioon, millega saab salvestamisel
pärida ID token-i */
var kasutaja;

function esitaEksamitoo() {
  /* Saada vastused Google Apps töölehele */
  console.log('esitaEksamitöö: Saada vastused Google Apps töölehele');

  $('#teateAla')
    .text('Oodake, salvestan...')
    .addClass('infoteade');

  /* ID token on oluline võtta iga kord enne salvestamist, sest see aegub tunniga. */
  var id_token = kasutaja.getAuthResponse().id_token;  

  // Kogu vastused
  // Vastusest edastatakse ainult esimene tärk (-, A, B, C või  D)
  // Vastused sidurdatakse üheks sõneks
  var vastused = '';
  for (var i = 1; i <= kysimusi; i++) {
    vastused = vastused + $('#s' + i.toString()).val().substring(0, 1);
  }
  // Koosta saadetav objekt
  var s = {
    IDToken: id_token, 
    tyyp: 'E', 
    vastused: vastused
  }; 

  // Salvesta vastused POST-päringuga Google töölehele
  var postDeferred = $.post(url, s);
  postDeferred.done(function (data, status) {
    // Logi tulemus sirviku konsoolile
    console.log('esitaEksamitoo: POST vastus: data (töölehe tulemus): ' + data.result);
    console.log('esitaEksamitoo: POST vastus: status: ' + status);
    // Töötle jQuery vastus
    if (status !== 'success') {
      $('#teateAla')
        .text('Salvestamine ebaõnnestus. Veakood: jQuery ' + status)
        .removeClass('infoteade')
        .addClass('veateade');
      return
    }
    // Töötle töölehe vastus
    if (data.result == 'success') {
      $('#teateAla')
        .text('Salvestatud.')
        .addClass('infoteade');
    } else { 
      $('#teateAla')
        .text('Salvestamine ebaõnnestus. Veakood: Google Apps ' + data.error.message)
        .removeClass('infoteade')
        .addClass('veateade');
      return
    }
	});

}    

function alusta() {
  // Kontrolli, kas Google tööleht on valmis tulemusi vastu võtma
  fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(saadudJSON => {
    $('#teenuseSeisund')
      .addClass('infoteade')
      .text('Teenus on avatud.');
    console.log('Teenus on avatud.');
  })
  .catch(error => {
    $('#teenuseSeisund')
      .addClass('veateade')
      .text('Teenus ei ole avatud.');
    console.log('Teenus ei ole avatud.');
  });
  // Käsitleja eksamitöö esitamise nupule
  $('#esitaNupp').on('click', e => {
    e.preventDefault(); 
    esitaEksamitoo();
  });
}