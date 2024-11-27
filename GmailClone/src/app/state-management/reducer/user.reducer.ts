import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/UserModel';
import { addUsers } from '../actions/user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  user: User | null;
}

export const initialState: UserState = {
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(addUsers, (state: UserState, { user }) => ({
    ...state,
    user: user,
  }))
);
