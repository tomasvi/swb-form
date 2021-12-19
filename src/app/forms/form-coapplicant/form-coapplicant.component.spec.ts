import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCoapplicantComponent } from './form-coapplicant.component';

describe('FormCoapplicantComponent', () => {
  let component: FormCoapplicantComponent;
  let fixture: ComponentFixture<FormCoapplicantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCoapplicantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCoapplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
