---
permalink: Backlog
---

# Backlogijuhtimine

![](img/Backlog.PNG)

***Backlogijuhtimise*** ülesanne on tuua planeerimisse realismi, paindlikkust, ressurssikasutusse fookust ja klientide vajadustele kiiremat reageerimist.

Backlog on hea juhtimis- ja töövahend mitme arenduses sagedase probleemi lahendamiseks: 1) ebarealistlikest eeldustest lähtuv planeerimine; kuigi projektides tehakse riskianalüüsi, on see suuresti formaalne; plaanimisel ei arvestada ressursside tegelike võimekustega (edenemistempodega), tehnilise keerukuse hindamisel on tendents olla liiga optimistlik; 2) pikk ja paindumatu arendustsükkel, mis ei suuda reageerida kiirelt muutuvale keskkonnale; seetõttu valmivad tooted, kus keskkond ja kasutajate vajadused on juba edasi liikunud. 

***Backlog*** on vajaduste, ideede, tooteomaduste või arendustööde juhitud kogum. Backlogi ***kirje*** (_item_) on backlogi element. Kirjete ***liigitamine*** on sageli kasulik võte. Näiteks: bugid, kasutajate ettepanekud, „pikema vinnaga taskid“ jne).

Backlogijuhtimine lähtub tõdemusest, et: 1) arendusressurss on alati piiratud; 2) klientide soovidest tuleb esmajärjekorras täita kõige olulisemad; 3) tehnoloogiline ja ärikeskkond on alati muutumises ning kõiki muutusi ei saa ette näha.

Nii nagu juhtimine ja arendus toimub mitmel tasandil, on backloge mitmeid ja mitmel tasandil. ***Sprindi backlog*** on kõige lühema töötsükli kavandatud tööde nimekiri. ***Toote backlog*** on toote omaduste kavandamisel olev nimekiri. ***Soovide backlog*** on kasutajate väljaselgitatud ja eeldatud vajaduste ning samuti oma arendusideede süstematiseeritud nimekiri.

Seos teiste juhtimisvormidega. ***Roadmap*** (teekaart) on valdkonna või toote arengu tähtsamate tendentside, suundumuste, prognooside, aga ka eesmärkide esitus. Roadmap võib sisaldada nii märksõnalisi kui ka ajas või sisus täpselt fikseeritud elemente. _Roadmap võib sisalduda teise nimega dokumendis või isegi olla jaotatud mitme dokumendi vahel._

***Prioriteet*** on backlogikirje suhteline tähtsus võrreldes teiste kirjetega. _Näiteks, „kriitilised“ – peame kindlasti ära tegema, „keskmine“ – ei ole otsustanud, kas teeme, „horisondil, aga mitte päevakorras“, „madala tähtsusega“ – tõenäoliselt sulgemisele minevad asjad._

***Backlogi formaat***. Backlog on nimekiri s.t ühtse struktuuriga kirjete korrastatud kogum. 

***Backlogi pidamise keskkond***. Toote- ja arendustiimid kasutavad backlogide pidamiseks erinevaid keskkondi: JIRA, GitHubi issue-d, Trello, Pivotal Tracker, Google Docs, Excel. Olulisemad nõuded backlogikeskkonnale on juurdepääsetavus, kirjete prioritiseerimise, lisamise ja eemaldamise (sulgemise) lihne võimalus.

***Backlogipidaja*** – isik, kes vastutab backlogi kvaliteedi eest ja korraldab backlogi haldust. Backlogipidajal on otsustav sõna kirjete lisamisel, eemaldamisel ja prioritiseerimisel.

***Backlogi haldus*** – backlogi pidamise reeglid võivad varieeruda, sõltuvalt backlogi tasemest ja liigist, samuti toote- või arendustiimi kokkulepetest. Siiski saab nimetada mõned tähtsamad tegevused ja põhimõtted. Tegevused: 1) kirjendamine; 2) kirjete täiendamine ja detailiseerimine (backlog grooming); 3)  liigitamine ja prioritiseerimine; 4) hindamine; 5) väljavalimine; 6) kirjete sulgemine. Tegevused annavad kasu ainult siis, kuid neid tehakse mõtestatult ja kompleksselt. Näiteks, tegemist vajavate _tööde või ideede kirjapanek üksi ei anna efekti, kui sellele ei järgne prioritiseerimist, väheväärtuslike asjade väljafiltreerimist, arendusressursi leidadmist ja tõeliselt oluliste asjade ärategemist_. Backlogi kasu ja kvaliteet avaldub backlogi võimes eraldada tõeliselt olulised tööd vähem väärtuslikest. Hästijuhitud backlog tõstab arendustiimi töö efektiivsust - sellega, et ei koorma arendustiimi üle. Backlog peab toimima filtrina. Erilise tähelepanu pöörata vältimaks nähtusi, kus vajadusi, töid ja eesmärke suunatakse töösse ilma tervikliku analüüsita (ärinõuded, tehnoloogilised piirangud, arendusressurss, aeg, raha).
_„Krokodillide komisjon“. Kutsutakse ellu skoobi kärpimiseks. Kui projekti alguses on väga innukalt listitud backlogi issuesid ja keset projekti selgub et raha/aega ei jätku kõige jaoks ja tuleb teha otsused mis esimesest reliisist välja jätta. MOPP projektis istus product owner (nõuete/soovide/prioriteetide pool) ja scrum master (tehnoloogilised vajadused) ja projektijuht (aeg/raha) maha, olles enne tuvastanud hinnangulise töömahu millest peab loobuma ja hakkasid reliisist välja viskama teemasid kuni vajalik töömaht on kärbitud._

***Sprindi backlog*** on seotud tööjärje kavandamisega kõige lähemas vaates (arendustsüklis pikkusega 1-2 nädalat). Sprindi planeerimise eesmärgiks on valida välja tehnoloogiliselt terviklik, arendustiimi reaalse suuruse ja edenemistempoga kooskõlas tööde kogum ja kinnitada see sprindi tööülesandena. Springi tööülesanne vormistatakse sprindi backlogina. Liigendatakse sageli kasutuslugude (user story) või tooteomaduste lõikes. Tihti kasutatakse kahetasandilist struktuuri kasutuslugu – task, vahel ka kolmetasandilist eepik – kasutuslugu – task. Tööde valimisel sprindi backlogi kasutatakse erinevaid meetodeid (keerukuse ja väärtuse hindamine, prioritiseerimine, punktisüsteem vm). Tähtis on, et tööülesanne on realistlik ja suunatud kõige suuremat väärtus andvatele töödele. Springi planeerimisel osalevad kõik tiimi liikmed. Otsus tehakse võimalusel konsensuse alusel. Lõpliku otsuse backlogipidaja.
Peamised sisendid sprindi planeerimisele on: 1) toote backlog (kui see on olemas); 2) projekti plaan; 3) tehniline lähteülesanne, arhitektuuridokument vms; 3) eelmiste sprintide käigus loodud tulemid; 4) eriti olulisena – eelmiste sprintide käigus saadud ***kogemusteave töö tegelikust keerukusest ja arendustiimi tegelikust edenemistempost*** (_team velocity_).

***Toote backlog*** on suunatud toote arengu suunamisele mitte sprindi ega ühe arendusprojekti, vaid toote kogu elutsükli mastaabis. Toote backlog on vajalik, kuna keerukamates toodetes ei ole kasutajale väärtust pakkuvad omadused loodavad ühe sprindiga. Seetõttu on toote backlogis kirjete mastaabiks arendusjärgud, suuremad omaduste kogumid. Toote backlog võib olla vormistatud mitmeti ja kanda erinevaid nimesid. Projektiplaan ei sobi toote backlogiks, sest projekt on ajas piiritletud, toote elutsükkel aga ei lõpe projektiga. ***Toote roadmap*** (teekaart), toote või teenuse arenduskava. Toote backlog on seotud ressursiplaneerimisega, kuid tavaliselt laiemas vaates. Toote backlogi võib pidada sprindi backlogiga ühes keskkonnas. Sellisel juhul on sprindi backlog alamhulk toote backlogist ja kirje võtmine sprindi plaani märgitakse lihtsalt töö märkimisega alustatuks. 

***Soovide backlog*** on toote kasutajate väljendatud või oletatavate vajaduste ja omapoolsete arendusideede nimekiri. Soovide backlogi sisendiks on: 1) ***pidev dialoog kasutajatega***. Rahuloluuuringud, regulaarsed kohtumised võtmekasutajatega, kasutajate pöördumiste lahendamise käigus saadud teabe kogumine (kasutajatoelt ja teenusehalduritelt); korraldab harilikult valdkonna- või tootejuht; 2) ***tehnoloogia monitooring***. eesmärgiks on toote või teenuse moraalse vananemise vältimine, toote elutsükli juhtimine tehnoloogilises plaanis; korraldab analüütik või arhitekt; 3) ***oma arendusideed***. Tootearendus ei pea olema ainult reaktiivne, tuleb ise otsida võimalusi innovatsiooniks; 4) ***ümbruse mõjud***. Riigi infosüsteemi osad on üksteisega seotud. Tootearendusel tuleb õigeaegselt arvestada muutustega taristutes ja sidussüsteemides. 5) ***organisatsiooni strateegilised eesmärgid***. 

