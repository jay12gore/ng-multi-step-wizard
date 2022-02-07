import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { PersonalDetailsComponent } from './registration-form/personal-details/personal-details.component';
import { ContactDetailsComponent } from './registration-form/contact-details/contact-details.component';
import { AddressDetailsComponent } from './registration-form/address-details/address-details.component';
import { PreviewAllDetailsComponent } from './registration-form/preview-all-details/preview-all-details.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneMaskDirective } from './phone-mask.directive';

@NgModule({
  declarations: [
    AppComponent,
    PersonalDetailsComponent,
    ContactDetailsComponent,
    AddressDetailsComponent,
    PreviewAllDetailsComponent,
    RegistrationFormComponent,
    PhoneMaskDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
