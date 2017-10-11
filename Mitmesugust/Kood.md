---
permalink: Kood
---

PROBLEEM<br>
A peab saatma B-le sõnumi (sõnum 1) ja mõni aeg hiljem veel ühe sõnumi (sõnum 2).<br>
Ründaja suudab võrguliiklust pealt kuulata. Ründaja võib ka võltsida saatja aadressi, näiteks saates A-na esinedes B-le võltssõnumi. Ründaja võib A-d isegi blokeerida - takistada A-d sõnumeid saatmast.<br>
B-le on oluline veenduda, et mõlemad sõnumid on tulnud ühelt ja samalt saatjalt. Kuidas ta saab seda teha?

![](img/KOOD-01.PNG)

LAHENDUS<br>
A valib juhuarvu `J`.<br>
A arvutab juhuarvust räsi `h(J)` ja lisab selle sõnumile 1.<br>
B peab saadud räsi meeles.
Sõnumit 2 saates lisab A sellele juhuarvu `J`.<br>
B arvutab saadud juhuarvust räsi ja võrdleb seda esimese sõnumiga saadud räsiga. Kui mõlemad räsiväärtused klapivad, siis on tegu ühe ja sama saatjaga.

Kuidas see töötab? Ründaja võib sõnumi 1 kinni püüda, kuid ta ei suuda räsiväärtusest `h(J)` arvutada juhuarvu `J`. Ilma viimaseta aga sõnumi 2 võltsimine ei õnnestu. 

![](img/KOOD-02.PNG)

