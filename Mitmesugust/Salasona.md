---
permalink: Salasona
---

## Salasõna väljapetmine

<img src='https://agiil.github.io/6068/img/Salasona.PNG' width='500'>

OpenID Connect protokoll, võtmehaldus, täpsemalt salasõnade levitamine toimub krüpteeritult, e-posti teel.

***Normaalne töövoog*** 1. Klientasutuse admin saadab teenusehaldurile salasõna vahetamise taotluse. (Näiteks põhjendusega, et senine salasõna tuli avalikuks). Taotlusele lisab oma isikukoodi.<br> 
2. Teenusehaldur genereerib uue salasõna, registreerib selle teenuse konfiguratsioonis ja saadab salasõna e-kirjaga, krüpteeritult taotluse esitajale. Krüpteeritakse ID-kaardi baastarkvara krüpteerimisvahendiga. Krüpteeritud sõnumit saab avada ainult taotluses näidatud isikukoodiga isik, oma ID-kaardi abil.

***Rünne*** 1' Ründaja saadab salasõna vahetamise taotluse, esinedes oma tegeliku nime all, kuid väites, et on klientasutuse admin. Taotlusele lisab oma isikukoodi.<br>
2 Teenusehaldur saadab uue salasõna, ründaja isikukoodiga krüpteeritult.<br>
3 Ründaja dekrüpteerib kirja, saab kätte salasõna.

***Ohtlikkus*** Kättesaadud salasõna on sisuliselt _keys to kingdom_ - suvalise kasutaja nimel esinemiseks klientasutuse infosüsteemis on ründajal nüüd vaja ületada vaid mõned kerged tehnilised takistused.

***Vastumeede*** Teenusehaldur peab veenduma, et klientasutuse admin ka tegelikult asutuses töötab.
