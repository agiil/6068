---
title: RIHA masinliidese kasutamine
permalink: APIabi
---

## Kuidas kasutada RIHA masinliidest?

Kõiki RIHAsse kogutud andmeid saab kasutada RIHA masinliidese e API kaudu.

Masinliidese andmed on avalikud. Igaüks võib neid alla laadida, töödelda, siduda muude andmetega, luua lisaväärtust andvaid rakendusi jms. 

Juurdepääs on piiratud ainult mitteavalikele isikuandmetele. Samuti on juurdepääs piiratud andmete RIHAsse kandmise masintoimingutele.

RIHA API aadress on `https://www.riha.ee/api/v1`.

## Kas proovime kohe?

Võite API-t kohe proovida. Sisestage veebisirvija aadressireal `https://www.riha.ee/api/v1/systems/kir.agri`.

Väljastatakse Kutselise kalapüügi registri masinloetav kirjeldus (`kir.agri` on süsteemi lühinimi):

```
{
  "id": 440380,
  "details": {
    "owner": {
      "code": "70000734",
      "name": "Maaeluministeerium"
    },
    "main_resource_id": 440380,
    "purpose": "Kutselise kalapüügi register on andmekogu, mille ülesanne on võimaldada kutselise kalapüügiga tegelevate isikute, nende tegevuse ja kalalaevade üle arvestuse pidamist ning järelevalve teostamist.\n\nKutselise kalapüügi register hõlmab endas kalalaevaregistrit ja kutselise kalapüügiga seonduvaid andmeid.",
    "documents": [
      {
        "name": "Kirjeldus vanas RIHAs",
        "url": "https://vana.riha.ee/riha/main/inf/kalanduse_infosusteem/1"
      },
      {
        "name": "RIHA - KIS_ERS_arhitektuur.pdf",
        "url": "file://ae5ad796-ec74-9d13-7d52-07981d930622"
      }
    ],
    "topics": [
      "Kalandus- ja merendusküsimused"
    ],
    "data_files": [
      {
        "name": "kis-agri_18sept.xmi",
        "url": "file://5ae2cab2-92ed-7442-77f7-3f87186e9df5"
      },
      {
        "name": "kis-agri_18sept.xmi",
        "url": "file://249e3863-85fc-ffe0-087c-c519376f2954"
      }
    ],
    "uuid": "45afc7bb-4e77-2dea-8be1-a6c9c345360e",
    "meta": {
      "x_road_status": {
        "status": "JOINED",
        "timestamp": "2017-06-01T00:00:00Z"
      },
      "update_timestamp": "2017-11-13T20:07:49.993+02:00",
      "system_status": {
        "status": "IN_USE",
        "timestamp": "2017-06-07T00:00:00Z"
      },
      "creation_timestamp": "2008-12-23T09:39:18Z",
      "development_status": "IN_DEVELOPMENT"
    },
    "name": "Kutselise kalapüügi register",
    "short_name": "kir.agri",
    "legislations": [
      {
        "name": "Kalapüügiga seonduvate andmete esitamise kord",
        "url": "https://www.riigiteataja.ee/akt/128122016008"
      },
...
    ],
    "homepage": "https://kir.agri.ee",
    "stored_data": []
  }
}
```

Nõuanne: Paigaldades veebisirvijasse JSON-i vaatamise laienduse, saate andmeid näha trepitult.

## Mis andmeid RIHA masinliides pakub?

Masinliidese kaudu saab infossüsteemide kirjeldusi, samuti andmeid arutelude (Issues) ja kommentaaride (Comments) kohta. Andmete koosseisu vaata lähemalt masinliidese formaalsest kirjeldusest (allpool).

RIHA väljastab masinloetavaid andmeid JSON vormingus.

## Kuidas andmeid pärida?

Vaatleme infosüsteemide kirjelduste pärimist. Arutelude ja kommentaaride andmeid päritakse sarnasel viisil. Täpsemalt vaata masinliidese formaalsest kirjeldusest (allpool).

Kõigi infosüsteemide nimekirja saamiseks kasutage päringut

`https://www.riha.ee/api/v1/systems`

Väljastatakse nimekiri, milles iga infosüsteemi kohta antakse lühiandmestik, nt:

```
{
  "id": null,
  "details": {
    "owner": {
      "code": "10117826",
      "name": "Bisnode Estonia AS"
    },
    "purpose": "Bisnode Estonia pakub oma klientidele äriinfoteenuseid, et aidata ettevõtetel teha paremaid äriotsuseid, suurendada müüki ja vähendada äririske",
    "documents": [
      {
        "name": "Kirjeldus vanas RIHAs",
        "url": "https://vana.riha.ee/riha/main/inf/intranet/1"
      }
    ],
    "topics": [
      "X-tee alamsüsteem"
    ],
    "meta": {
      "x_road_status": {
        "status": null,
        "timestamp": null
      },
      "update_timestamp": "2017-06-08T16:50:50Z",
      "system_status": {
        "status": "IN_USE",
        "timestamp": null
      },
      "creation_timestamp": "2017-06-02T12:03:30Z",
      "development_status": null
    },
    "name": "Intranet",
    "short_name": "10117826-intranet",
    "data_files": null,
    "uuid": "33c6a7ba-57cf-f4ab-51ae-72c838ce4f24",
    "legislations": null,
    "homepage": null,
    "stored_data": null
  }
}
```

Kuna infosüsteeme on palju, väljastatakse andmed leheküljeti. Päringu vastus algab infosüsteemide arvuga, nt `"totalElements":1674`, sellele järgneb element `"content"` infosüsteemide kirjeldustega. Vastuse lõpus on lehekülje number, lehekülgede arv ja lehekülje suurus: `"page":0,"totalPages":84,"size":20`.

Lehekülje suurust saab seada. Näiteks päring

`https://www.riha.ee/api/v1/systems?size=5&page=3`
 
seab lehekülje suuruseks `5` ja väljastab lehekülje `3`.

Infosüsteemi detailse kirjelduse saamiseks lisage päringule infosüsteemi lühinimi: 

`https://www.riha.ee/api/v1/systems/{infosüsteemi lühinimi}`

Näiteks

`https://www.riha.ee/api/v1/systems/70002443-ekis` (Luua Metsanduskool).

## Masinliidese formaalne kirjeldus

RIHA masinliides on kirjeldatud OpenAPI (Swagger) vormingus. Kirjeldus asub:

[RIHA-Browser API](https://raw.githubusercontent.com/e-gov/RIHA-Browser/master/backend/src/main/resources/static/swagger.yaml).

Kirjeldust saate sirvida ka ReDoc vormingus:

[https://kertuhiire.github.io/RIHA-Help/](https://kertuhiire.github.io/RIHA-Help/).

Abiks võib olla ka [RIHA andmete JSON-skeem](https://github.com/e-gov/RIHA-Browser/blob/master/backend/src/main/resources/infosystem_schema.json).

## Andmekasutajad

RIHA masinloetavate andmete ümber kujuneb andmekasutajate "ökosüsteem". Teadaolevate RIHA andmeid masinliidese kaudu tarbivate süsteemide hulgas on:

- RIHA laiendatud otsingu prototüüp (otsib omaniku nimest, registrikoodist, infosüsteemi nimest ja lühinimest), [https://e-gov.github.io/RIHA-Experiments/otsi](https://e-gov.github.io/RIHA-Experiments/otsi), lähtekood: [https://github.com/e-gov/RIHA-Experiments/edit/master/otsi.html](https://github.com/e-gov/RIHA-Experiments/edit/master/otsi.html).

- "RIHA aktiivsusmonitor", [https://apidemojatest.herokuapp.com/watch](https://apidemojatest.herokuapp.com/watch), lähtekood: [https://github.com/e-gov/RIHA-API-Demo](https://github.com/e-gov/RIHA-API-Demo).




