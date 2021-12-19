import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { FormOneComponent } from './forms/form-one/form-one.component';
import { FormTwoComponent } from './forms/form-two/form-two.component';
import { InfoboxComponent } from './infobox/infobox.component';
import { FormLiabilitiesComponent } from './forms/form-liabilities/form-liabilities.component';
import { FormCoapplicantComponent } from './forms/form-coapplicant/form-coapplicant.component'

@NgModule({
  declarations: [
    AppComponent,
    FormOneComponent,
    FormTwoComponent,
    InfoboxComponent,
    FormLiabilitiesComponent,
    FormCoapplicantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
