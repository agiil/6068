'use strict';

function onSignIn(googleUser) {
  /*
    Google Sign-In
  
    "A GoogleUser object represents one user account."
    Arusaamatu, kuidas googleUser moodustatakse.
    GoogleUser kirjeldus vt: https://developers.google.com/identity/sign-in/web/reference#users 

    ID token pannakse kaasa uue teksti salvestamispäringus ja valideeritakse serveri poolel - Google Apps Script rakenduses

    ID tokeni audience-ks on CLIENT_ID '554561859935-1ojca8mj94fa41mebnjnhqvt83t4gdfj.apps.googleusercontent.com', see on seatud HTML-avalehel meta-päises 'google-signin-client_id'.

  */
  kasutaja = googleUser;
  var kasutajaProfiil = googleUser.getBasicProfile();
  autenditud = true;
  $('#Kasutaja').text(kasutajaProfiil.getGivenName() + ' ' + kasutajaProfiil.getFamilyName());
  $('#KasutajaEmail').text(kasutajaProfiil.getEmail());
};
