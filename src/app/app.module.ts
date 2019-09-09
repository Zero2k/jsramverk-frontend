import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd';
import { ThemeModule } from './theme.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeComponent } from './me/me.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    MeComponent,
    PageNotFoundComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ThemeModule,
    AppRoutingModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {}
