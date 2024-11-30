import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SignUpState } from './signup.reducer';

export const selectSignUpState = createFeatureSelector<SignUpState>('signup');

export const selectUser = createSelector(
  selectSignUpState,
  (state: SignUpState) => state.user
);

export const selectLoading = createSelector(
  selectSignUpState,
  (state: SignUpState) => state.loading
);

export const selectError = createSelector(
  selectSignUpState,
  (state: SignUpState) => state.error
);

export const selectOtp = createSelector(
  selectSignUpState,
  (state: SignUpState) => state.otp
);
