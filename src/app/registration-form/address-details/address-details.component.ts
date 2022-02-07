import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from 'src/app/state.service';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})

export class AddressDetailsComponent implements OnInit {
  addressDetailsForm: FormGroup;
  stateData: any[] = [];
  stateList = [];
  step;
  isSubmitted;

  constructor(private fb: FormBuilder,
              private stateService: StateService) { }

  ngOnInit(): void {
    this.stateService.getStateList()
      .subscribe( data => {
          Object.assign(this.stateData, data);
    });
    this.createAddressDetailsForm();
    this.stateService.stepWizardDetails.subscribe( value => this.step = value);
    if(this.step === 'step3') {
      this.stateService.addressDetails
      .subscribe(data => {
        if(data) {
          this.addressDetailsForm.patchValue({
            street: data.street,
            city: data.city,
            zip: data.zip,
            state: data.state,
          });
        }
      });
    }
  }

  createAddressDetailsForm() {
    this.addressDetailsForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      state: ['', Validators.required]
    })
  }

  setAddressDetails() {
    this.isSubmitted = true;
    if(!this.addressDetailsForm.valid) return true;
    const payload = this.addressDetailsForm.value;
    this.stateService.addressDetails.next(payload);
    this.stateService.setStepWizard('step4');
  }

  getAddressDetails() {
    this.stateService.setStepWizard('step2');
  }

  getStateNames() {
    let stateName = this.addressDetailsForm.value.state;
    this.stateList = [];
    if (stateName.length > 2) {
      this.stateList = this.searchFromStateArray(this.stateData, stateName);
    }
  }

  searchFromStateArray(arr, val) {
    return arr.filter(e => e.name.toLowerCase().includes(val.toLowerCase()));
  };

}
