import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectUsers } from '../state-management/selectors/user.selectors';
import { Observable } from 'rxjs';
import { User } from '../models/UserModel';
import { Email } from '../models/email';
import { selectSenderEmails } from '../state-management/selectors/email.selectors';

@Injectable({
  providedIn: 'root',
})
export class StoreGetService {
  constructor(private readonly storeService: Store) {}

  getUserDetails(): Observable<User | null> {
    return this.storeService.pipe(select(selectUsers));
  }

  getSenderMais(): Observable<Email[]> {
    return this.storeService.pipe(select(selectSenderEmails));
  }
}
