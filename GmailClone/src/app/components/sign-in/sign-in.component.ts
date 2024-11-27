import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toast: ToastrService
  ) {
    if (this.authService.isAuthenticated()) {
      this.navigateToRoleBasedPage();
    }
  }
  isSaveProgress = false;
  login(): void {
    if (this.password != '' && this.password != undefined) {
      this.errorMessage = '';
      this.isSaveProgress = true;
      this.authService
        .login(environment.user_auth_api, this.userEmail, this.password)
        .subscribe((x: any) => {
          if (x) {
            this.isSaveProgress = false;
            this.toast.success('Login successful');
            this.navigateToRoleBasedPage();
          } else {
            this.isSaveProgress = false;
            console.log('Invalid username or password. Please try again');
            this.errorMessage =
              'Invalid username or password. Please try again';
          }
        });
    } else {
      this.errorMessage = 'Please enter password';
    }
  }

  private navigateToRoleBasedPage() {
    this.router.navigate(['/dash-board']);
  }
  isEmailValid = false;
  validateEmail() {
    if (this.userEmail != '') {
      if (this.userEmail.length < 5) {
        this.errorMessage = 'Please enter valid email address';
        this.isEmailValid = false;
      } else if (
        this.userEmail.indexOf('@') == -1 ||
        this.userEmail.indexOf('.') == -1
      ) {
        this.errorMessage = 'Please enter valid email address';
        this.isEmailValid = false;
        return;
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
    if (this.isVisibilePassword) {
      this.passwordType = 'text';
    }
    if (!this.isVisibilePassword) {
      this.passwordType = 'password';
    }
  }
}
