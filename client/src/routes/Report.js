import React from 'react';

const questions = [
  {
    id: 1,
    title: 'Kmom01',
    content:
      '<p>Github: <a href="https://github.com/Zero2k/jsramverk">Zero2k</a></p> <p>Installera paket / moduler med `npm install` eller `yarn install`.</p>'
  },
  {
    id: '2',
    title: 'Kmom02',
    content:
      '<p>Github: <a href="https://github.com/Zero2k/jsramverk">Zero2k</a></p> <p>I detta kursmoment har jag uppdaterat hela strukturen på applikationen och istället för att lägga alla komponenter i `src` mappen så har jag delat upp innehållet i två mappar: `components` och `routes` för att få en bättre överblick över hela projektet. Dessutom har jag bytat ut Ant Design mot Bootstrap då det går snabbare att bygga en enkelt layout och jag har även bättre koll på css klasserna.</p><p>Min date picker har jag försökt designa så den ska ha samma färger som Bootstrap och utseende mässigt ville jag ha något som påminner om Material Design. Själva koden för att generera själva kalendern har jag också fått ta inspiration till då jag aldrig har gjort något liknande innan. Först försökte jag göra en date picker med hjälp av JavaScripts Date(). Trodde först jag hade löst det då den aktuella månaden vissades korrekt, men det blev något problem när man byta månad då den förskött dagarna, så om till exempel en månad sluta på en måndag så börja nästa månad på onsdagen... Koden till denna date picker finns i mappen datepicker och har copy efter filnamnet.</p><p>Till sist hitta jag en bra guide på hur man kan bygga en date picker i Angular och med den lyckades jag generera dagarna korrekt.</p><p>Det finns också en begränsning med den nuvarande lösningen och det är att om man använder tab för att ändra fält så kommer kalendern inte att öppnas automatiskt och det beror på att jag fick ta bort (focus)="onShowCalendar($event)" från datepicker.component.html. Tydligen så körs koden: `(document:click): onCloseCalendar($event)` innan `(focus)="onShowCalendar($event)"` vilket då stänger kalendern direkt när man klickar på fältet.</p><p>Själva registreringsformuläret har också validering och den vissar felmeddelande om namnet, e-posten eller lösenordet inte anges, tyvärr fick jag inte rätt med felmeddelandet till min date picker men för att hela formuläret ska vara giltigt så måste användaren ange en födelsedatum.</p>'
  }
];

const Report = props => {
  console.log(props.match.params.id);

  return (
    <p>Report</p>
  )
}

export default Report
