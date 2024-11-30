import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MailState } from './mail.reducer';

export const selectMailFeature = createFeatureSelector<MailState>('mail');

export const selectMailByTag = (
  tag: 'sender' | 'inbox' | 'trash' | 'archive' | 'draft'
) =>
  createSelector(selectMailFeature, (state: MailState) => state[`${tag}Mail`]);