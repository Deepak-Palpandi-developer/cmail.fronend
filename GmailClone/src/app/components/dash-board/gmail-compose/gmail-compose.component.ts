import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-gmail-compose',
  templateUrl: './gmail-compose.component.html',
  styles: ``
})
export class GmailComposeComponent {

  @Output() closeComposeMail = new EventEmitter<boolean>();

  closeCompose() {
    this.closeComposeMail.emit(false);
  }
}
