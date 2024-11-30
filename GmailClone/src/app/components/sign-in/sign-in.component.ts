import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../../states/auth/auth.reducer';
import { login } from '../../states/auth/auth.actions';
import {
  selectAuthError,
  selectAuthLoading,
} from '../../states/auth/auth.selectors';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styles: ``,
})
export class SignInComponent {
  userEmail = 'john.doe@example.com';
  password = 'deepakpdp@1234';
  errorMessage = '';
  isVisibilePassword = false;
  passwordType = 'password';
  isEmailValid = false;

  errorMessage$!: Observable<string | null>;
  isLoading$!: Observable<boolean>;

  constructor(
    private readonly router: Router,
    private readonly store: Store<AuthState>,
    private readonly authService: AuthService
  ) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dash-board']);
    }
    this.errorMessage$ = this.store.select(selectAuthError);
    this.isLoading$ = this.store.select(selectAuthLoading);
  }
  isSaveProgress = false;
  login(): void {
    if (this.password != '' && this.password != undefined) {
      this.store.dispatch(
        login({ request: { email: this.userEmail, password: this.password } })
      );
      
    } else {
      this.errorMessage = 'Please enter password';
    }
  }

  validateEmail() {
    if (this.userEmail != '') {
      if (
        this.userEmail.length < 5 ||
        this.userEmail.indexOf('@') == -1 ||
        this.userEmail.indexOf('.') == -1
      ) {
        this.errorMessage = 'Please enter a valid email address';
        this.isEmailValid = false;
      } else {
        this.errorMessage = '';
        this.isEmailValid = true;
      }
    } else {
      this.errorMessage = 'Please enter email address';
      this.isEmailValid = false;
    }
  }

  viewPassword() {
    this.isVisibilePassword = !this.isVisibilePassword;
    this.passwordType = this.isVisibilePassword ? 'text' : 'password';
  }
}
