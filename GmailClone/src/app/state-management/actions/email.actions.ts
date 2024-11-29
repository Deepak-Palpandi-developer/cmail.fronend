import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Email } from '../../models/email';

export const addSenderMails = createAction(
  '[Email] Add Sender Mails',
  (email: Email[]) => ({
    email,
  })
);

export const addInboxMails = createAction(
  '[Email] Add Inbox Mails',
  (email: Email[]) => ({
    email,
  })
);

export const EmailActions = createActionGroup({
  source: 'Email',
  events: {
    'Load Emails': emptyProps(),
  },
});
