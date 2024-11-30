import { createReducer, on } from '@ngrx/store';
import * as MailActions from './mail.actions';
import { Email } from '../../models/email';

export interface MailState {
  senderMail: Email[];
  inboxMail: Email[];
  trashMail: Email[];
  archiveMail: Email[];
  draftMail: Email[];
  error: string | null;
}

export const initialState: MailState = {
  senderMail: [],
  inboxMail: [],
  trashMail: [],
  archiveMail: [],
  draftMail: [],
  error: null,
};

export const mailReducer = createReducer(
  initialState,
  on(MailActions.loadMailSuccess, (state, { tag, mail }) => ({
    ...state,
    [`${tag}Mail`]: Array.isArray(mail) ? [...mail] : [mail],
  })),
  on(MailActions.loadMailFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(MailActions.composeMailSuccess, (state, { tag, mail }) => ({
    ...state,
    [`${tag}Mail`]: Array.isArray(mail) ? [...mail] : [mail],
  }))
);
