import { Component, OnInit } from '@angular/core';

const data = {
  name: 'Viktor Bengtsson',
  about:
    'Detta är en hemsida som är skapad i kursen jsramverk som är en del av programmet webbprogrammering vid BTH. Sidan är skapad av Viktor Bengtsson som just nu studerar webbprogrammering hos BTH.',
  content:
    '<h2>Val av ramverk</h2><p>I de kommande kursmomenten kommer jag arbeta med Angular.js för att testa hur ramverket fungerar. Har tidigare jobbat med React.js så därför vill jag testa något nytt. Dessutom vill jag lära mig mer om TypeScript så då passa Angular.js bra eftersom ramverket använder TypeScript som standard. Sen gillar jag att mycket kom färdigt med Angular som till exempel tester, scss och och ett enkelt sätt att hantera routes.</p><h3>Design</h3><p>Planen var att använda Angular Material för att få tlllgång till lite färdiga design element och komponenter, men tyvärr känns dokumentationen väldigt begränsad och nästan lite ofärdig. Så därför har jag istället valt att använda Ant Design som jag har bättre kunskap om.</p>'
};

interface Me {
  name: string;
  about: string;
  content: string;
}

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {
  data: Me;

  constructor() {}

  ngOnInit() {
    this.data = data;
  }
}
