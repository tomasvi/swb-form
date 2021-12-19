import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLiabilitiesComponent } from './form-liabilities.component';

describe('FormLiabilitiesComponent', () => {
  let component: FormLiabilitiesComponent;
  let fixture: ComponentFixture<FormLiabilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLiabilitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLiabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
