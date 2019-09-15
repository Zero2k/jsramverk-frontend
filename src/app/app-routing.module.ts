import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeComponent } from './routes/me/me.component';
import { ReportComponent } from './routes/report/report.component';
import { LoginComponent } from './routes/login/login.component';
import { PageNotFoundComponent } from './routes/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: MeComponent },
  { path: 'reports/week/:id', component: ReportComponent },
  { path: 'login', component: LoginComponent },
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
