import { createAction, props } from '@ngrx/store';
import { Email } from '../../models/email';

export const loadMail = createAction(
  '[Mail] Load Mail',
  props<{
    email: string;
    tag: 'sender' | 'inbox' | 'trash' | 'archive' | 'draft';
  }>()
);

export const loadMailSuccess = createAction(
  '[Mail] Load Mail Success',
  props<{
    tag: 'sender' | 'inbox' | 'trash' | 'archive' | 'draft';
    mail: Email;
  }>()
);

export const composeMailSuccess = createAction(
  '[Mail] Load Mail Success',
  props<{
    tag: 'sender' | 'inbox' | 'trash' | 'archive' | 'draft';
    mail: Email;
  }>()
);

export const loadMailFailure = createAction(
  '[Mail] Load Mail Failure',
  props<{ error: any }>()
);

export const composeMail = createAction(
  '[Mail] Compose Mail',
  props<{ email: Email }>()
);