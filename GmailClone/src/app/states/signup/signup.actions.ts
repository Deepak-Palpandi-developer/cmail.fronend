import { createAction, props } from '@ngrx/store';
import { SignUp } from '../../models/UserModel';

export const signupUser = createAction(
  '[SignUp] Signup User',
  props<{ user: SignUp }>()
);

export const signupUserSuccess = createAction(
  '[SignUp] Signup User Success',
  props<{ response: any }>()
);

export const signupUserFailure = createAction(
  '[SignUp] Signup User Failure',
  props<{ error: any }>()
);

export const sendOtp = createAction(
  '[SignUp] Send OTP',
  props<{ mobileNumber: string }>()
);

export const sendOtpSuccess = createAction(
  '[SignUp] Send OTP Success',
  props<{ otp: string }>()
);

export const sendOtpFailure = createAction(
  '[SignUp] Send OTP Failure',
  props<{ error: any }>()
);
