import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { StateService } from '../state.service';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { PreviewAllDetailsComponent } from './preview-all-details/preview-all-details.component';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  isPrevious = false;
  isNext = true;
  isSubmit = false;
  step = 'step1';
  @ViewChild(PersonalDetailsComponent) personalDetailsComponent: PersonalDetailsComponent;
  @ViewChild(ContactDetailsComponent) contactDetailsComponent: ContactDetailsComponent;
  @ViewChild(AddressDetailsComponent) addressDetailsComponent: AddressDetailsComponent;
  @ViewChild(PreviewAllDetailsComponent) previewAllDetailsComponent: PreviewAllDetailsComponent;

  constructor(private router: Router,
              private stateService: StateService) { }

  ngOnInit(): void {
    this.router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          if(event['url'] === '/personal-details') {
            this.stateService.setStepWizard('step1');
          } else if(event['url'] === '/contact-details') {
            this.stateService.setStepWizard('step2');
          } else if(event['url'] === '/address-details') {
            this.stateService.setStepWizard('step3');
          } else if(event['url'] === '/preview-details') {
            this.stateService.setStepWizard('step4');
          }
        }
      }
    });

    this.stateService.getStepWizard().
      subscribe(data => {
        this.step = data || 'step1';
        if(this.step === 'step1') {
          this.isPrevious = false;
          this.router.navigate(['personal-details']);
        } else if(this.step === 'step2') {
          this.isPrevious = true;
          this.router.navigate(['contact-details']);
        } else if(this.step === 'step3') {
          this.isSubmit = false;
          this.isNext = true;
          this.isPrevious = true;
          this.router.navigate(['address-details']);
        } else {
          this.isNext = false;
          this.isSubmit = true;
          this.router.navigate(['preview-details']);
        }
      });
      this.stateService.previewDetails
        .subscribe(data => {
          console.log('All Details', data);
          this.isPrevious = false;
        })
  }

  previousStep(event?:any) {
    if(this.step === 'step1') {
      this.personalDetailsComponent.getPersonalDetails();
    } else if(this.step === 'step2') {
      this.contactDetailsComponent.getContactDetails();
    } else if(this.step === 'step3') {
      this.addressDetailsComponent.getAddressDetails();
    } else {
      this.previewAllDetailsComponent.getPreviewDetails();
    }
  }

  nextStep(event:any) {
    if(this.step === 'step1') {
      this.personalDetailsComponent.setPersonalDetails();
    } else if(this.step === 'step2') {
      this.contactDetailsComponent.setContactDetails();
    } else if(this.step === 'step3') {
      this.addressDetailsComponent.setAddressDetails();
    }
  }

  submit(event:any) {
    this.previewAllDetailsComponent.setPreviewDetails();
  }

}
