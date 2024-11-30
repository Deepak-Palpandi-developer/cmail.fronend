// auth.actions.ts
import { createAction, props } from '@ngrx/store';
import { LoginRequest, User } from '../../models/UserModel';

export const login = createAction(
  '[Auth] Login',
  props<{ request: LoginRequest }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; userDetails: User; isTokenExpire: boolean }>()
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);
export const token = createAction(
  '[Auth] Token',
  props<{ token: string; userDetails: User; isTokenExpire:boolean}>()
);
export const logout = createAction('[Auth] Logout');
