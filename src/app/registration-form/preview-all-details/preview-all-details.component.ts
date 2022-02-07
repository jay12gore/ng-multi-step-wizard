import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/state.service';

@Component({
  selector: 'app-preview-all-details',
  templateUrl: './preview-all-details.component.html',
  styleUrls: ['./preview-all-details.component.scss']
})
export class PreviewAllDetailsComponent implements OnInit {
  userDetails = {
    'personal': [],
    'contact': [],
    'address': [],
  };
  constructor(private stateService: StateService) { }

  ngOnInit(): void {
    this.stateService.personalDetails.
      subscribe(value => {
        this.userDetails.personal.push(value);
    });
    this.stateService.contactDetails.
      subscribe(value => {
        this.userDetails.contact.push(value);
    });
    this.stateService.addressDetails.
      subscribe(value => {
        this.userDetails.address.push(value);
    });
  }

  setPreviewDetails() {
    this.stateService.setStepWizard('step4');
    this.stateService.previewDetails.next(this.userDetails);
  }

  getPreviewDetails() {
    this.stateService.setStepWizard('step3');
  }

}
