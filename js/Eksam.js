// Globaalsed muutujad
  /* REST API-t pakkuv Google Sheet, kus hindeid hoitakse. */
  var url = 'https://script.google.com/a/macros/tlu.ee/s/AKfycbybjF4-1pNhu5QLtUCPvBXIw8VBv7BFEDKkyBRy-8fyLk5h6iY/exec';
  var autenditud = false; // Kas kasutaja on Google Sign-In teenuse abil autenditud
  /* Google Sign-In funktsioon, millega saab salvestamisel
  pärida ID token-i */
  var kasutaja;

function esitaEksamitoo() {
  /* Saada vastused Google Apps töölehele */

  /* ID token on oluline võtta iga kord enne salvestamist, sest see aegub tunniga. */  
  var id_token = kasutaja.getAuthResponse().id_token;  

  // Kogu vastused
  // Vastusest edastatakse ainult esimene tärk (-, A, B, C või  D)
  var vastused = [
    $("#s1").val().substring(0, 1),
    $("#s2").val().substring(0, 1)
  ];  

  // Koosta saadetav objekt
  var s = {
    IDToken: id_token, 
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
        .addClass('veateade');
      return
    }
    // Töötle töölehe vastus
    if (data.result == 'success') {
      $('#teateAla')
        .text('Salvestatud')
        .addClass('infoteade');
    } else { 
      $('#teateAla')
        .text('Salvestamine ebaõnnestus. Veakood: Google Apps ' + data.error)
        .addClass('infoteade');
      return
    }
	});

}    

function alusta() {
  // Kontrolli, kas Google tööleht on valmis tulemusi vastu võtma
  $.get({
    url: url,
    dataType: 'text',
    success: function( resp ) {
      $('#teenuseSeisund').text('Teenus on avatud.');
    },
    error: function (req, status, err) {
      $('#teenuseSeisund').text('Teenus ei ole avatud.');
      console.log( 'alusta: Google tööleht ei tööta: ', status, err );
    }
  });
}