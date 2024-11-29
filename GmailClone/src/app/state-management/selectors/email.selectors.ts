import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as email from '../reducer/email.reducer';

export const selectEmailFeature = createFeatureSelector<email.EmailState>(
  email.emailFeatureKey
);

export const selectInboxEmails = createSelector(
  selectEmailFeature,
  (state: email.EmailState) => state.inboxEmails
);

export const selectSenderEmails = createSelector(
  selectEmailFeature,
  (state: email.EmailState) => state.senderEmails
);
