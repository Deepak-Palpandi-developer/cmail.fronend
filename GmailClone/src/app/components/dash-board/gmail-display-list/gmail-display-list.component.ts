import { Component, Input } from '@angular/core';
import { Email } from '../../../models/email';
import { CommonService } from '../../../shared/common.service';

@Component({
  selector: 'app-gmail-display-list',
  templateUrl: './gmail-display-list.component.html',
  styles: ``,
})
export class GmailDisplayListComponent {
  @Input() menuName: string = '';
  @Input() emails: Email[] = [];
  @Input() isTabChange: boolean = false;

  isEmailView: boolean = false;

  email!: Email;

  ngOnInit() {
    console.log(this.isEmailView);
  }

  ngOnChanges() {
    this.isEmailView = this.isTabChange;
  }

  constructor(public readonly commonService: CommonService) {}

  emailViewMode(email: Email) {
    this.email = email;
  }

  backToList() {
    this.isEmailView = false;
  }
}
