import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from '../reducer/user.reducer';

export const selectUserState = createFeatureSelector<fromUsers.UserState>(
  fromUsers.userFeatureKey
);

export const selectUsers = createSelector(
  selectUserState,
  (state: fromUsers.UserState) => state.user
);
