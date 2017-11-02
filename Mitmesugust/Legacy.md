---
permalink: Legacy
---

## "Sessiooni üleandmise" e "Legacy" muster

<img src='https://agiil.github.io/6068/img/Legacy.PNG' width='500'>

Lähteseis. Kasutaja on sisse loginud rakendusse A.

1a Kasutaja vajutab nupule "Mine rakendusse B" vms. Veebisirvijast läheb päring rakenduse A serverikomponendile.

2a A serverikomponent saadab X-tee päringu rakenduse B serverikomponendile. Päringus saadetakse kasutaja isikukood ja küsitakse luba rakendusse B siseneda.

2b Rakendus B kontrollib, kas juurdepääsu andmiseks on alust, genereerib juhusliku sõne, lisab selle rakenduse B URL-le ja saadab moodustatud URL-i ("turva-URL-i") rakendusele A.

1b Rakendus A saadab päringu 1a vastusega 1b veebisirvijasse ümbersuunamiskorralduse (_redirect_) rakenduselt B saadud URL-le.

3 Rakendus B kontrollib, kas saabunud URL on sama, mille ta väljastas ja loob kasutajale sessiooni. 