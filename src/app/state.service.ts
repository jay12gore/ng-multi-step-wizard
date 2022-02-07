import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  personalDetails = new BehaviorSubject(null);
  contactDetails = new BehaviorSubject(null);
  addressDetails = new BehaviorSubject(null);
  previewDetails = new BehaviorSubject(null);
  stepWizardDetails = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  setStepWizard(data: any) {
    this.stepWizardDetails.next(data);
  }

  getStepWizard(): Observable<any> {
    return this.stepWizardDetails.asObservable();
  }

  getStateList() {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.get('/assets/state.json', { headers });
  }
}
