import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from 'src/app/state.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  contactDetailsForm: FormGroup;
  isSubmitted;
  step;

  constructor(private fb: FormBuilder,
              private stateService: StateService) { }

  ngOnInit(): void {
    this.createContactDetailsForm();
    this.stateService.stepWizardDetails.subscribe( value => this.step = value);
    if(this.step === 'step2') {
      this.stateService.contactDetails
      .subscribe(data => {
        if(data) {
          this.contactDetailsForm.patchValue({
            phone: data.phone,
            email: data.email
          });
        }
      });
    }
  }

  createContactDetailsForm() {
    this.contactDetailsForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern("^[\\d() +-]+$")]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
    });
  }

  setContactDetails() {
    this.isSubmitted = true;
    if(!this.contactDetailsForm.valid) return true;
    const payload = this.contactDetailsForm.value;
    this.stateService.contactDetails.next(payload);
    this.stateService.setStepWizard('step3');
  }

  getContactDetails() {
    this.stateService.setStepWizard('step1');
  }

}

export function emailValidator(control: AbstractControl): Validators | null {
  if (control.dirty) {
    let isValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);
    if (isValid || control.value === '') {
      return null;
    } else {
      return { email: true }
    }
  }
}
