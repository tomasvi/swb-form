import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormCoapplicantComponent } from '../form-coapplicant/form-coapplicant.component';

@Component({
  selector: 'form-two',
  templateUrl: './form-two.component.html',
  styleUrls: ['./form-two.component.scss']
})
export class FormTwoComponent {
  // Math: any = Math

  @Input()
  public form!: FormGroup
  @Input()
  formValidation!: boolean

  static createForm(): FormGroup {
    return new FormGroup({
      education: new FormControl(null, [
        Validators.required
      ]),
      position: new FormControl(null, [
        Validators.required
      ]),
      scope: new FormControl(null, [
        Validators.required
      ]),
      timespan: new FormControl(null, [
        Validators.required
      ]),
      type: new FormControl(null, [
        Validators.required
      ]),
      status: new FormControl(null, [
        Validators.required
      ]),
      coapplicants: new FormArray([]),
      phone: new FormControl(null, [
        Validators.required,
        // Validators.pattern(/(^(\+3706){1}[0-9]{7}$)|(^(86){1}[0-9]{7}$)|(^(6){1}[0-9]{7}$)/)
        Validators.pattern(/(^(\+370){1}[0-9]{8}$)|(^(8){1}[0-9]{8}$)|(^[0-9]{8}$)/)
      ])
    })
  }

  onChangePosition(): void {
    const position = this.form.get('position')
    const nojob = position ? [6,7,8,9].includes(position.value) : false
    const controls = ['scope', 'timespan', 'type']
    if (nojob) {
      controls.forEach(control => this.form.removeControl(control))
    } else {
      const newControl = new FormControl(null, [ Validators.required ])
      controls.forEach(control => {
        if (!this.form.get(control)) {
          this.form.addControl(control, newControl)
        }
      })
    }
  }

  onPhoneBlur(): void {
    const control = this.form.get('phone')
    if (control?.valid) {
      if (/(^(8){1}[0-9]{8}$)/.test(control.value)) {
        control.setValue('+370' + control.value.substr(1))
      } else if (/(^[0-9]{8}$)/.test(control.value)) {
        control.setValue('+370' + control.value)
      }
    }
  }

  addCoapplicant(): void {
    const array = this.form.get('coapplicants') as FormArray
    array.push(FormCoapplicantComponent.createForm())
  }

  removeCoapplicant(index: number): void {
    const array = this.form.get('coapplicants') as FormArray
    array.removeAt(index)
  }

  get coapplicants(): FormGroup[] {
    const formArray = this.form.get('coapplicants') as FormArray
    const controls = formArray.controls
    const formGroups = [] as FormGroup[]
    for (let i = 0; i < controls.length; i++) {
      const formGroup = controls[i] as FormGroup
      formGroups.push(formGroup)
    }
    return formGroups
  }

}
