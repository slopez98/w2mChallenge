import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input('title') titleButton: string = ''
  @Output() clickEvent = new EventEmitter<boolean>()

  handleAddHero() {
    this.clickEvent.emit(true)
  }
}
