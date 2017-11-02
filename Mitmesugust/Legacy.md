---
permalink: Legacy
---

## "Sessiooni üleandmise" e "Legacy" muster

<img src='https://agiil.github.io/6068/img/LEGACY.PNG' width='400'>

Lähteseis. __Kasutaja__ on sisse loginud rakendusse __A__.

__1a__ __Kasutaja__ vajutab nupule "Mine rakendusse B" vms. Veebisirvijast läheb päring rakenduse __A__ serverikomponendile.

__2a__ Rakenduse __A__ serverikomponent saadab X-tee päringu rakenduse __B__ serverikomponendile. Päringus saadetakse kasutaja isikukood ja küsitakse luba rakendusse __B__ siseneda.

__2b__ Rakendus __B__ kontrollib, kas juurdepääsu andmiseks on alust, genereerib juhusliku sõne, lisab selle rakenduse __B__ URL-le ja saadab moodustatud URL-i ("turva-URL-i") rakendusele __A__.

__1b__ Rakendus __A__ saadab päringu __1a__ vastusega __1b__ veebisirvijasse ümbersuunamiskorralduse (_redirect_), mille toimel kasutajale suuna rakenduselt __B__ saadud URL-le.

__3__ Rakendus __B__ kontrollib, kas saabunud URL on see, mida ta on väljastanud, loob __kasutajale__ sessiooni ja saadab veebisirvijasse rakenduse avalehe. __Kasutaja__ alustab (sisselogitult) tööd rakenduses __B__. 