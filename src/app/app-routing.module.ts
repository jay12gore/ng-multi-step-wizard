import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressDetailsComponent } from './registration-form/address-details/address-details.component';
import { ContactDetailsComponent } from './registration-form/contact-details/contact-details.component';
import { PersonalDetailsComponent } from './registration-form/personal-details/personal-details.component';
import { PreviewAllDetailsComponent } from './registration-form/preview-all-details/preview-all-details.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationFormComponent,
    data: { routeLevel: 'Group' },
    children: [
      {
        path: 'personal-details',
        component: PersonalDetailsComponent,
        data: { route_data: 'Group' }
      },
      {
        path: 'contact-details',
        component: ContactDetailsComponent,
        data: { route_data: 'Group' }
      },
      {
        path: 'address-details',
        component: AddressDetailsComponent,
        data: { route_data: 'Group' }
      },
      {
        path: 'preview-details',
        component: PreviewAllDetailsComponent,
        data: { route_data: 'Group' }
      },
      { path: '**', redirectTo: 'personal-details' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
