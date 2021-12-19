import { Component, Input } from '@angular/core';

@Component({
  selector: 'infobox',
  templateUrl: './infobox.component.html',
  styleUrls: ['./infobox.component.scss']
})
export class InfoboxComponent {

  @Input()
  public type: 'info' | 'warning' | 'danger' = 'info'

  @Input()
  public message!: string

}
