---
permalink: Murdskriptimine
---

***Murdskriptimine*** on sõna, mida enamik IT-inimesi pole kuulnudki. (Paljud on kuulnud _code injection_-st ja _DROP TABLE;_-st [8], kuid see pole päris eesti keel.) Ometi peaks see puudutama paljusid, sest tegu on kõige suurema turvanõrkusega (veebirakenduste vallas). 

Murdskriptimine, inglise keeles _Cross Site Scripting_ (XSS) on autoriteetse OWASP veebirakenduste turvanõrkuste Top 10 edetabelis olnud juba vähemalt kümme aastat. 

Koodisüstimine, katkine autentimine ja seansihaldus murdskriptimise läbi ning murdskriptimine ise – veebirakenduse kontekstis sisuliselt üks ja sama asi – hõivavad OWASP 2016 edetabelis koguni kolm esimest kohta [1].

Murdskriptimist võib käsitada koodisüstimise (_Code Injection_) alamliigina. Populaarne, mõneti naiivne ettekujutus XSS-st on selline, et ründaja surub oma koodi meie koodi sekka. Kuidas ta seda teeb ja miks kümne aastaga pole suudetud sellisest hirmutavast vigade kategooriast vabaneda?

Lühidalt öeldes seisneb murdskriptimine selles, et ründaja saadab andmeteks maskeeritud koodi, mida rakendus ekslikult parsib mitte andmetena, vaid koodina.
 
Näiteks, kasutaja sisestab teksti; tahame teksti kuvada, nii, et teksti keskmine täht on rõhutatud.

Kasutaja sisestab:

![](img/MURD-01.PNG)
 
Rakendus modifitseerib ja väljastab:

![](img/MURD-02.PNG)
  
Kuidas seda teha? Rakendus:<br>
1) püüab kinni sisestatava teksti (`t`);<br>
2) lööb selle kolmeks tükiks (`t.substring()` vms abil) – `t1`, `k`, `t2`;<br>
3) lükib tekstitükkide vahele rõhutust tekitavad taagid `<b>` ja `</b>`;<br>
4) saadab täiendatud teksti kuvamiseks, populaarse teegi jQuery kasutamisel nii: 

````
		$(’#tekstikast’).html(t1 + ’<b>’ + k + ’</b>’ + t2);
````

See ongi koht, kus kood ja andmed lähevad segamini.

Kuid tahaksime sisestatud teksti ilma täiendusteta kuvada, siis kasutaksime jQuery meetodit `text()`:

````
		$(’#tekstikast’).text(t);
````

Vahe on selles, et `text()` kuvab argumendiks oleva tärgijada töötluseta, „as is“. `html()` tõlgendab oma argumenti HTML-tekstina ja üritab sellest taage leida. HTML-taagid aga võivad sisaldada Javascripti, s.t täidetavat koodi.

Rakendus paneb küll ohutud `<b>` ja `</b>` taagid, kuid kasutaja sisestatud tekst võib põhimõtteliselt samuti sisaldada taage. Me ei mõtle tavaliselt sellele võimalusele – sest kes hakkaks teksti, mille puhul on selge, et see pole HTML, taage sisestama? Ründevõimalusena on see aga olemas. Kasutaja võib sisestada `<script>alert(’Hei!’);</script>` - ja on juba saavutanud kontrolli meie rakenduse üle.

Mida me saame teha? Tähtsaim kaitsevahend murdskriptimise ja muude koodisüstrünnete vastu on sisendi kontrollimine ja puhastamine (_sanitization_). Ohtlikud konstruktsioonid muudetakse inertseks. Meie juhul peaksime programmi lisama laused, mis kontrollivad, kas sisestatud tekstis on sümboleid `<` ja `>` - ning need kõrvaldama. Siis ei saa skriptitaagid, ega ka muud taagid – sest needki võivad sisaldada koodijuppe, enam töötlusse jõuda.

Laiem teema on, kuidas ebasobiv sisend ära tunda. “Tuleb aru saada kontekstist, milles kasutaja sisendit kasutatakse”, ütleb HTML-i puhastamisest rääkiv artikkel [2]. Programmeerimiskeeled ja kasutuskontekstid on aga erinevad. Võib-olla raske ette näha, milliseid töötlusi andmed edaspidises töövoos läbida.

Tellija ootab – ja peab enesestmõistetavaks, et programmeerija teeb kõik vajalikud sanitiseerimised. Nii levinud ohu kõrvaldamine peaks igal programmeerijal selge olema.

Teadlased on aga leidnud, et murdskriptimist on tegelikult raske juba täpselt defineerida, rääkimata probleemi kindlast ja lõplikust lahendamisest [3]. Leitakse üha uusi murdskriptimise liike [7] ja probleemil ei paista lõppu tulevat.

Kui tahaksime kõik ebasobivad sisendid välja filtreerida, siis peaksime täpselt defineerima, millised sisendid on lubatud. (Elementaarne ju?) See aga tähendab modelleerimist, seejuures piisavalt formaliseeritud modelleerimist, et mudeli järgi saaks valideerimiskoodi kirjutada. Ülalesitatud näites peaksime sõnastama, et sisendiks on igasugune tärgijada, v.a `<` ja `>`. Sellest ei tarvitse aga piisata. Lubatud sisendi täpne defineerimine võib avatud keskkonnaga suhtlevates süsteemides olla keeruline (vt ka [4]).

Olukorda, kus andmed ei ole inertne mass, vaid sisaldavad instruktsiooni tegutsemiseks – ja seda peetakse ohuks, ei kohta mitte ainult tehnilises infotöötluses. Meetodeid, kuidas terad sõkaldest eraldada, on ajaloos katsetatud mitmesuguseid.

Raskuste üks allikas võib peituda keele mitmetimõistetavuses.

Öösel koputati uksele: "peremees, kas puid on vaja". " Ei ole mulle mingeid puid vaja." Hommikuks olid puud läinud.

Ideaalse keele otsingud ei ole andnud tulemusi. OWASP edetabel näitab, et mitmetimõistetavuse probleemist ei ole vabad ka masinkeeled.

XSS, CSRF jms märksõnade taga näib seega peituvat igivana nähtus – keegi pani sõnumit ahelat pidi liikuma, sõnum liikus, keegi sai aru, keegi ei saanud aru, keegi sai hoopis valesti aru – ja tegutses vastavalt.

Murdskriptimise küsimust võib küsida ka avaandmete kontekstis: kas oleme kindlad, et väljapandud andmetes ei sisaldu instruktsiooni tegutsemiseks? (Et mõni masin neid lugedes hulluks ei läheks?) [6]

- -
18+ seletus:
Rannalinna restoranis unises ja uhkes
üle mitme-setme aasta lõbus lööming puhkes... [5]

[1] https://www.veracode.com/directory/owasp-top-10<br> 
[2] There's more to HTML escaping than &, <, >, and ", http://wonko.com/post/html-escaping<br>
[3] Wilander (2012) Is XSS Solved?http://appsandsecurity.blogspot.com.ee/2012/11/is-xss-solved.html<br>
[4] Wilander (2013) Should String Be An Abstract Class? http://appsandsecurity.blogspot.com.ee/2013/05/should-string-be-abstract-class.html<br>
[5] „Rannalinna restoranis“, sõnad H. Runnel, viis K. Kilvet<br>
[6] Avaandmete puhul loodame, et paneme andmed välja, keegi kasutab neid, kuidas kasutab, ei ole ette teada – ja loodame, et sellest tekib suur majanduslik efekt. Kes ja kus teeb andmete sanitiseerimise või see pole vajalik?<br>
[7] Heiderich et al {2012] Scriptless Attacks – Stealing the Pie Without Touching the Sill, https://www.hgi.rub.de/media/emma/veroeffentlichungen/2012/08/16/scriptlessAttacks-ccs2012.pdf<br>
[8] https://nakedsecurity.sophos.com/2017/01/06/best-company-name-ever-share-capital-1-name-priceless/ 


