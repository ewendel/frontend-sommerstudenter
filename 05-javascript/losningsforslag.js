function slideShow() {
  var current = $('#slideshow .show');
  var next = current.next().length ? current.next() : current.parent().find('li:first');
  current.hide().removeClass('show');
  next.fadeIn().addClass('show');

  setTimeout(slideShow, 5000);
}

Man må kunne følgende:

* Hente ut DOM-elementer
* DOM-traversering
* Vise/skjule
* Klasse-håndtering
* setTimeout

Oppgave 1:

* Huske hvilken som vises nå
* Skjule de andre
* Legge på klasser for å vise/skjule én om gangen
* Kul overgang: fadeIn
* For å få loop til å gå, kall metoden setTimeout
* Legg på "Forrige/Neste"-knapp
* Stoppe når man scroller ned

Oppgave 2: 

Lage bildegalleri med bilder fra Flickr
1-4 i del 2, frontend101

Oppgave 3: 

Del 2: Input-felt (del 3, frontend101)


