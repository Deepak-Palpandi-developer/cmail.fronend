import { createReducer, on } from '@ngrx/store';
import * as SignUpActions from './signup.actions';
import { SignUp } from '../../models/UserModel';

export interface SignUpState {
  user: SignUp | null;
  loading: boolean;
  error: any;
  otp: string;
}

export const initialState: SignUpState = {
  user: null,
  loading: false,
  error: null,
  otp: '',
};

export const signupReducer = createReducer(
  initialState,
  on(SignUpActions.signupUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SignUpActions.signupUserSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    user: response,
  })),
  on(SignUpActions.signupUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(SignUpActions.sendOtp, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SignUpActions.sendOtpSuccess, (state, { otp }) => ({
    ...state,
    loading: false,
    otp,
  })),
  on(SignUpActions.sendOtpFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
