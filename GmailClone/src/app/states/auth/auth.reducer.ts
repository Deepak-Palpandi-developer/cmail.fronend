import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../../models/UserModel';

export interface AuthState {
  token: string | null;
  error: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  userDetails: User | null;
  isTokenExpire: boolean;
}

const initialState: AuthState = {
  token: null,
  error: null,
  isAuthenticated: false,
  loading: false,
  userDetails: null,
  isTokenExpire: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    AuthActions.loginSuccess,
    (state, { token, userDetails, isTokenExpire }) => ({
      ...state,
      token,
      userDetails,
      isAuthenticated: true,
      loading: false,
      isTokenExpire,
    })
  ),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(AuthActions.token, (state, { token, userDetails, isTokenExpire}) => ({
    ...state,
    token,
    isAuthenticated: true,
    userDetails,
    isTokenExpire
  })),
  on(AuthActions.logout, () => initialState)
);
