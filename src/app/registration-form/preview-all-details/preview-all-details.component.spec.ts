import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAllDetailsComponent } from './preview-all-details.component';

describe('PreviewAllDetailsComponent', () => {
  let component: PreviewAllDetailsComponent;
  let fixture: ComponentFixture<PreviewAllDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewAllDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewAllDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
