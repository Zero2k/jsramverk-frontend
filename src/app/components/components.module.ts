import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    DatepickerComponent,
    LoginFormComponent
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    DatepickerComponent,
    LoginFormComponent
  ]
})
export class ComponentsModule {}
