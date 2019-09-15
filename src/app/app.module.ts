import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from './components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MeComponent } from './routes/me/me.component';
import { ReportComponent } from './routes/report/report.component';
import { LoginComponent } from './routes/login/login.component';
import { PageNotFoundComponent } from './routes/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    MeComponent,
    ReportComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
