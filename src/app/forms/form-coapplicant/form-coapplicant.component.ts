import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'form-coapplicant',
  templateUrl: './form-coapplicant.component.html',
  styleUrls: ['./form-coapplicant.component.scss']
})
export class FormCoapplicantComponent {
  @Input()
  public form!: FormGroup
  @Input()
  formValidation!: boolean

  static createForm(): FormGroup {
    return new FormGroup({
      firstname: new FormControl('', [
        Validators.required
      ]),
      lastname: new FormControl('', [
        Validators.required
      ]),
      code: new FormControl('', [
        Validators.required
      ]),
      relationship: new FormControl(null, [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    })
  }

}
