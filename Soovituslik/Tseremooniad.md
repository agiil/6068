---
title: Tseremooniad
permalink: Tseremooniad
---

Veebiautentimise uus standard [1] on meeldiv näide, kuidas mõni teoreetilisem idee jõuab – võtab aastaid, aga jõuab – ka praktikasse. Carl Ellison pakkus kümme aastat tagasi välja tseremoonia (_ceremony_) mõiste [2]. Tseremoonia on võrguprotokolli mõiste laiendus, hõlmates lisaks arvutiseadmetele ja võrguühendustele ka kasutajaliidest, inimeste otsesuhtlust jm toiminguid, mis andmevahetusprotokollides tavaliselt jäetakse käsitlusalast välja.

See, mis protokollis on _out-of-band_, on tseremoonias _in-band_. Ellisoni mõisted on nüüd veebiautentimise standardis kasutusele võetud. Lisaks tseremooniale on standardikavandis päris selgelt defineeritud žest (_gesture_), kasutaja kohaloleku kontroll (_test of user presence_), isikusamasuse tuvastamine (_user verification_) ja kasutaja nõusolek (_user consent_):

```
Ceremony 
The concept of a ceremony [Ceremony] is an extension of the concept of a network protocol, with human nodes alongside computer nodes and with communication links that include user interface(s), human-to-human communication, and transfers of physical objects that carry data. What is out-of-band to a protocol is in-band to a ceremony. In this specification, Registration and Authentication are ceremonies, and an authorization gesture is often a component of those ceremonies.

Authorization Gesture 
An authorization gesture is a physical interaction performed by a user with an authenticator as part of a ceremony, such as registration or authentication. By making such an authorization gesture, a user provides consent for (i.e., authorizes) a ceremony to proceed. This may involve user verification if the employed authenticator is capable, or it may involve a simple test of user presence.

Authentication 
The ceremony where a user, and the user’s computing device(s) (containing at least one authenticator) work in concert to cryptographically prove to an Relying Party that the user controls the credential private key associated with a previously-registered public key credential (see Registration). Note that this typically includes employing a test of user presence or user verification.

Test of User Presence
A test of user presence is a simple form of authorization gesture and technical process where a user interacts with an authenticator by (typically) simply touching it (other modalities may also exist), yielding a boolean result. Note that this does not constitute user verification because a user presence test, by definition, is not capable of biometric recognition, nor does it involve the presentation of a shared secret such as a password or PIN.

User Consent
User consent means the user agrees with what they are being asked, i.e., it encompasses reading and understanding prompts. An authorization gesture is a ceremony component often employed to indicate user consent.
```

Tseremoonia mõiste eesmärk oli Ellisonil laiendada turvaanalüüsi ja –disaini skoopi. Ta üritas pakkuda ka meetodeid inimkomponente haarava süsteemi turvaanalüüsiks. (Inimese käitumine ei ole deterministlik ega programmeeritav. Inimese käitumist tuleb Ellisoni arvates võtta tõenäosuslikuna.)

Valimiste lähenedes võib ennustada e-valimiste tehnilise usaldatavuse ja turvalisuse taastõusmist meedia ja erinevate huvirühmade poolt aktiivselt arendatavaks diskussiooniteemaks. 

Saab olema huvitav vaadata, mida diskussioonides – ja neid kindlasti tuleb – loetakse `out-of-band` olevaks.

Kas turvaanalüüsi käsitlusalas, `in-band`-is on ka inimeste mõjutamiseks tehtud toimingud enne, kui urni, füüsilise või e-urni juurde jõutakse?

[1] W3C (2017) Web Authentication: An API for accessing Public Key Credentials Level 1, https://www.w3.org/TR/webauthn/#biblio-credential-management-1.<br>
[2] Ellison, Carl (2007) Ceremony Design and Analysis. https://eprint.iacr.org/2007/399.pdf 
