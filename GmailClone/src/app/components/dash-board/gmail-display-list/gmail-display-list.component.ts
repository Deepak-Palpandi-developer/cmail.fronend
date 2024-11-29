import { Component, Input } from '@angular/core';
import { Email } from '../../../models/email';

@Component({
  selector: 'app-gmail-display-list',
  templateUrl: './gmail-display-list.component.html',
  styles: ``,
})
export class GmailDisplayListComponent {
  @Input() menuName: string = '';
  @Input() emails: Email[] = [];

  ngOnInit() {
    console.log(this.emails);
  }
}
