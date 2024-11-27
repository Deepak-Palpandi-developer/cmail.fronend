import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gmail-display-list',
  templateUrl: './gmail-display-list.component.html',
  styles: ``,
})
export class GmailDisplayListComponent {
  @Input() menuName: string = '';
}
