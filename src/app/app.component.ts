import { ViewportScroller } from '@angular/common'
import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FormOneComponent } from './forms/form-one/form-one.component'
import { FormTwoComponent } from './forms/form-two/form-two.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  Math: any = Math

  step: number
  form1: FormGroup
  form2: FormGroup
  formError: boolean
  formValidation: boolean
  currentDate: Date

  constructor(private scroller: ViewportScroller) {
    this.step = 0
    this.form1 = FormOneComponent.createForm()
    this.form2 = FormTwoComponent.createForm()
    this.formError = false
    this.formValidation = false
    this.currentDate = new Date()
  }

  previousStep(): void {
    this.formError = false
    const temp = (this.step - 1)
    if (temp > 0) {
      this.step = temp
    }
  }

  nextStep(): void {
    this.formValidation = true
    this.formError = (this.step === 1 && !this.form1.valid) || (this.step === 2 && !this.form2.valid)
    if (this.formError) {
      this.scroller.scrollToAnchor('content')
    } else {
      this.formValidation = false
      const temp = (this.step + 1)
      if (temp <= 4) {
        this.step = temp
      }
    }
  }

  termValueString(): string {
    const value = this.form1.get('term')?.value
    const years = Math.trunc(value / 12)
    const yearsString = years ? years + ' metai' : ''
    const months = value % 12
    const monthsString = months ? months + ' mėnesiai' : ''
    const spacer = years && months ? ' ' : ''
    return yearsString + spacer + monthsString
  }
}
