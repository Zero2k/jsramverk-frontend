import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeComponent } from './me/me.component';
import { ReportComponent } from './report/report.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: MeComponent },
  { path: 'reports/week/:id', component: ReportComponent },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
