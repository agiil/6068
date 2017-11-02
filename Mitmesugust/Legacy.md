---
permalink: Legacy
---

## "Sessiooni üleandmise" e "Legacy" muster

<img src='https://agiil.github.io/6068/img/LEGACY.PNG' width='500'>

Lähteseis. Kasutaja on sisse loginud rakendusse A.

<code>1a</code> Kasutaja vajutab nupule "Mine rakendusse B" vms. Veebisirvijast läheb päring rakenduse A serverikomponendile.

<code>2a</code> A serverikomponent saadab X-tee päringu rakenduse B serverikomponendile. Päringus saadetakse kasutaja isikukood ja küsitakse luba rakendusse B siseneda.

<code>2b</code> Rakendus B kontrollib, kas juurdepääsu andmiseks on alust, genereerib juhusliku sõne, lisab selle rakenduse B URL-le ja saadab moodustatud URL-i ("turva-URL-i") rakendusele A.

<code>1b</code> Rakendus A saadab päringu 1a vastusega 1b veebisirvijasse ümbersuunamiskorralduse (_redirect_) rakenduselt B saadud URL-le.

<code>3</code> Rakendus B kontrollib, kas saabunud URL on sama, mille ta väljastas ja loob kasutajale sessiooni. 