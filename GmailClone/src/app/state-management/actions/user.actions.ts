import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';

import { User } from '../../models/UserModel';

export const addUsers = createAction('[User] Add Users', (user: User) => ({
  user,
}));

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
  },
});
