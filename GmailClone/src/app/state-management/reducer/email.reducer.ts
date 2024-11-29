import { createReducer, on } from '@ngrx/store';
import { Email } from '../../models/email';
import { addInboxMails, addSenderMails } from '../actions/email.actions';

export const emailFeatureKey = 'email';

export interface EmailState {
  inboxEmails: Email[];
  senderEmails: Email[];
}

export const initialState: EmailState = {
  inboxEmails: [],
  senderEmails: [],
};

export const Emailreducer = createReducer(
  initialState,
  on(addInboxMails, (state: EmailState, { email }) => ({
    ...state,
    emails: [...state.inboxEmails, email],
  })),
  on(addSenderMails, (state: EmailState, { email }) => ({
    ...state,
    senderMails: [...state.senderEmails, email],
  }))
);
