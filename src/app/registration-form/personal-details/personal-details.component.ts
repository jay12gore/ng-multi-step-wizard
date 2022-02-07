import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from 'src/app/state.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  personalDetailsForm: FormGroup;
  isSubmitted;
  step;

  constructor(private fb: FormBuilder,
              private stateService: StateService,
              private router: Router) { }

  ngOnInit(): void {
    this.personalDetailsForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required]
    });
    this.stateService.stepWizardDetails.subscribe( value => this.step = value);
    if(this.step === 'step1') {
      this.stateService.personalDetails
      .subscribe(data => {
        if(data) {
          this.personalDetailsForm.patchValue({
            fname: data.fname,
            lname: data.lname,
            age: data.age,
            dob: data.dob,
          });
        }
      });
    }
  }

  setPersonalDetails() {
    this.isSubmitted = true;
    if(!this.personalDetailsForm.valid) return true
    const payload = this.personalDetailsForm.value;
    this.stateService.personalDetails.next(payload);
    this.stateService.setStepWizard('step2');
  }

  getPersonalDetails() {
    this.stateService.setStepWizard('step1');
  }

}
