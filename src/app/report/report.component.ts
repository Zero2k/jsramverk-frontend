import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const questions = [
  {
    id: '1',
    title: 'Kmom01',
    content:
      '<p>Github: <a href="https://github.com/Zero2k/jsramverk">Zero2k</a></p> <p>Installera paket / moduler med `npm install` eller `yarn install`.</p>'
  }
];

interface Question {
  id: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  id: string;
  question: Question;
  private subscription: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];

      this.question = questions.filter(q => q.id === this.id)[0];
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
