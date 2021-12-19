import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'form-liabilities',
  templateUrl: './form-liabilities.component.html',
  styleUrls: ['./form-liabilities.component.scss']
})
export class FormLiabilitiesComponent {
  @Input()
  public form!: FormGroup
  @Input()
  formValidation!: boolean

  balanceTotal: string = '0.00'
  monthlyTotal: string = '0.00'

  static innerGroup(): FormGroup {
    return new FormGroup({
      balance: new FormControl((0).toFixed(2), [
        Validators.required,
        Validators.min(0)
      ]),
      monthly: new FormControl((0).toFixed(2), [
        Validators.required,
        Validators.min(0)
      ])
    })
  }

  static createForm(): FormGroup {
    return new FormGroup({
      consumer: this.innerGroup(),
      leasing: this.innerGroup(),
      credit: this.innerGroup(),
      housing: this.innerGroup(),
      other: this.innerGroup()
    })
  }

  // get balanceTotal(): string {
  //   let total = 0
  //   for (const field in this.form.controls) {
  //     const group = this.form.get(field) as FormGroup
  //     const control = group.get('balance') as FormControl
  //     total += control.value
  //   }
  //   return this.toAbsFixedFloat(total)
  // }

  // get monthlyTotal(): string {
  //   let total = 0
  //   for (const field in this.form.controls) {
  //     const group = this.form.get(field) as FormGroup
  //     const control = group.get('monthly') as FormControl
  //     total += parseFloat(control.value)
  //     console.log(total, parseFloat(control.value))
  //   }
  //   return this.toAbsFixedFloat(total)
  // }

  onBlurBalance(control: string): void {
    const group = this.form.get(control)
    const balance = group?.get('balance')
    const monthly = group?.get('monthly')

    balance?.setValue(this.toAbsFixedFloat(balance?.value))
    monthly?.setValidators(
      parseFloat(balance?.value) > 0
        ? [Validators.required, Validators.min(0.01)]
        : [Validators.required, Validators.min(0.00)]
    )
    monthly?.updateValueAndValidity()
    
    this.updateBalanceTotal()
  }

  onBlurMonthly(control: string): void {
    const group = this.form.get(control)
    const balance = group?.get('balance')
    const monthly = group?.get('monthly')

    monthly?.setValue(this.toAbsFixedFloat(monthly?.value))
    balance?.setValidators(
      parseFloat(monthly?.value) > 0
        ? [Validators.required, Validators.min(0.01)]
        : [Validators.required, Validators.min(0.00)]
    )
    balance?.updateValueAndValidity()

    this.updateMonthlyTotal()
  }

  toAbsFixedFloat(value: any): string {
    const float = value ? parseFloat(value) : 0.00
    const absFloat = Math.abs(float)
    const absFixedFloat = absFloat.toFixed(2)
    return absFixedFloat
  }

  updateBalanceTotal(): void {
    let total = 0
    for (const field in this.form.controls) {
      const group = this.form.get(field) as FormGroup
      const control = group.get('balance') as FormControl
      total += parseFloat(control.value)
    }
    this.balanceTotal = this.toAbsFixedFloat(total)
  }

  updateMonthlyTotal(): void {
    let total = 0
    for (const field in this.form.controls) {
      const group = this.form.get(field) as FormGroup
      const control = group.get('monthly') as FormControl
      total += parseFloat(control.value)
    }
    this.monthlyTotal = this.toAbsFixedFloat(total)
  }
}
