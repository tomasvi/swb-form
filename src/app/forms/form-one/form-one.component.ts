import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormLiabilitiesComponent } from '../form-liabilities/form-liabilities.component';

@Component({
  selector: 'form-one',
  templateUrl: './form-one.component.html',
  styleUrls: ['./form-one.component.scss']
})
export class FormOneComponent {
  Math: any = Math
  formLiabilities: FormGroup
  salaryWarning: boolean

  @Input()
  public form!: FormGroup
  @Input()
  formValidation!: boolean

  constructor() {
    this.formLiabilities = FormLiabilitiesComponent.createForm()
    this.salaryWarning = false
  }

  static createForm(): FormGroup {
    return new FormGroup({
      amount: new FormControl(500, [
        Validators.required,
        Validators.min(500),
        Validators.max(20000)
      ]),
      term: new FormControl(6, [
        Validators.required,
        Validators.min(6),
        Validators.max(60)
      ]),
      payday: new FormControl(null, [
        Validators.required
      ]),
      salary: new FormControl(null, [
        Validators.required,
        Validators.min(0)
      ]),
      liabilities: new FormControl(false)
    })
  }

  onChangeLiabilities(): void {
    const liabilities = this.form.get('liabilities')?.value
    if (liabilities) {
      this.form.addControl('liabilitiesDetailed', this.formLiabilities)
    } else {
      this.form.removeControl('liabilitiesDetailed')
    }
  }

  onBlurSalary(): void {
    const salary = this.form.get('salary')
    if (salary?.value !== null) {
      salary?.setValue(this.toAbsFixedFloat(salary?.value))
      this.salaryWarning = salary?.value < 350 ? true : false
    }
  }

  toAbsFixedFloat(value: any): string {
    const float = value ? parseFloat(value) : 0.00
    const absFloat = Math.abs(float)
    const absFixedFloat = absFloat.toFixed(2)
    return absFixedFloat
  }

  termValueString(): string {
    const value = this.form.get('term')?.value
    const years = Math.trunc(value / 12)
    const yearsString = years ? years + ' metai' : ''
    const months = value % 12
    const monthsString = months ? months + ' mėnesiai' : ''
    const spacer = years && months ? ' ' : ''
    return yearsString + spacer + monthsString
  }

  onAmountDeduct(): void {
    const control = this.form.get('amount')
    const value = parseFloat(control?.value)
    const remainder = value % 50
    if (value <= 500) {
      control?.setValue(500)
    } else if (value >= 20000) {
      control?.setValue(19950)
    } else if (remainder) {
      control?.setValue(value - remainder)
    } else {
      control?.setValue(value - 50)
    }
  }

  onAmountAdd(): void {
    const control = this.form.get('amount')
    const value = parseFloat(control?.value)
    const remainder = value % 50
    if (value <= 500) {
      control?.setValue(550)
    } else if (value >= 20000) {
      control?.setValue(20000)
    } else if (remainder) {
      control?.setValue(value - remainder + 50)
    } else {
      control?.setValue(value + 50)
    }
  }

  onTermDeduct(): void {
    const control = this.form.get('term')
    const value = parseFloat(control?.value)
    const remainder = value % 6
    if (value <= 6) {
      control?.setValue(6)
    } else if (value >= 60) {
      control?.setValue(54)
    } else if (remainder) {
      control?.setValue(value - remainder)
    } else {
      control?.setValue(value - 6)
    }
  }

  onTermAdd(): void {
    const control = this.form.get('term')
    const value = parseFloat(control?.value)
    const remainder = value % 6
    if (value <= 6) {
      control?.setValue(12)
    } else if (value >= 60) {
      control?.setValue(60)
    } else if (remainder) {
      control?.setValue(value - remainder + 6)
    } else {
      control?.setValue(value + 6)
    }
  }
}
