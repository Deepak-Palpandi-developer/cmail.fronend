import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addUsers } from '../state-management/actions/user.actions';
import { User } from '../models/UserModel';
import { Email } from '../models/email';
import {
  addInboxMails,
  addSenderMails,
} from '../state-management/actions/email.actions';

@Injectable({
  providedIn: 'root',
})
export class StorePushService {
  constructor(private readonly storeService: Store) {}

  setUserDetails(user: User) {
    this.storeService.dispatch(addUsers(user));
  }

  setSenderMail(email: Email[]) {
    this.storeService.dispatch(addSenderMails(email));
  }

  selectInboxEmail(email: Email[]) {
    this.storeService.dispatch(addInboxMails(email));
  }
}
