---
permalink: CORS
---

## Päritoluülene ressursikasutus (CORS)

Päritoluülene ressursikasutus, _cross-origin resource sharing (CORS)_ on meetod veebisirvijasse laetud erinevate rakenduste vahelise suhtlemise ohjamiseks, eelkõige ligipääsu piiramiseks.

Vaikimisi kehtib __sama päritolu põhimõte__, _same origin policy_, mille kohaselt veebisirvijas olevast rakendusest ei saa teha andmepäringut (nn AJAX-päringut) teise rakendusse.

CORS annab meetodi sama päritolu põhimõtet kontrollitult lõdvendada.

Joonis 1

<img src='https://agiil.github.io/6068/img/CORS-01.PNG' width='420'>

Joonis 2

<img src='https://agiil.github.io/6068/img/CORS-02.PNG' width='360'>

Joonis 3

<img src='https://agiil.github.io/6068/img/CORS-03.PNG' width='340'>

Hea praktika on pakkuda avalikku API-t CORS-põhimõttel. Nt [GitHubi API](https://developer.github.com/v3/) "supports Cross Origin Resource Sharing (CORS) for AJAX requests from any origin."

CORS turvalisusest vt [Guide to Secure Implementation of HTML5's Cross Origin Requests](https://code.google.com/archive/p/html5security/wikis/CrossOriginRequestSecurity.wiki)