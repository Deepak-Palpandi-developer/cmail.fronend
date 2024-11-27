import { Component, TemplateRef, ViewChild } from '@angular/core';
import { HttpCommonService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { CustomTemplateDirective } from '../../aleart-components/custom-template.directive';
import { ConfirmAlertComponent } from '../../aleart-components/confirm-alert/confirm-alert.component';
import {
  confirmDialog,
  CustomTemplateComponent,
} from '../../models/confirmDialog';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styles: ``,
})
export class SignUpComponent {
  usernameSuggestions: string[] = [];
  signupForm!: FormGroup;
  generatedOtp: string = '';

  @ViewChild(CustomTemplateDirective, { static: true })
  customTemplate!: CustomTemplateDirective;
  alertComponent: any = [ConfirmAlertComponent];
  alertComponentRef: any;
  @ViewChild('content') confirmationModal!: TemplateRef<any>;

  constructor(
    private readonly httpService: HttpCommonService<any>,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    public commonService: CommonService,
    private readonly toastr: ToastrService
  ) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dash-board']);
    }
  }

  ngOnInit() {
    this.createSignUpForm();
    this.signupForm
      .get('firstName')
      ?.valueChanges.subscribe(() => this.generateUsername());
    this.signupForm
      .get('lastName')
      ?.valueChanges.subscribe(() => this.generateUsername());
  }

  createSignUpForm() {
    this.signupForm = this.formBuilder.group(
      {
        firstName: [
          'Demo Clone',
          [Validators.required, Validators.minLength(5)],
        ],
        lastName: ['Gmail'],
        username: ['Demo@gmail.com', [Validators.required, Validators.email]],
        password: [
          'Demo@123',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£%^&*?~]{8,}$/
            ),
          ],
        ],
        confirmPassword: ['Demo@123', [Validators.required]],
        mobileNumber: [9825180897],
        otp: [''],
        dateOfBirth: ['2000-01-11', Validators.required],
        isverified: [false],
        gender: ['Male', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ mismatch: true });
    } else {
      confirmPassword!.setErrors(null);
    }
  }

  get firstName() {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get username() {
    return this.signupForm.get('username');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get mobileNumber() {
    return this.signupForm.get('mobileNumber');
  }

  get otp() {
    return this.signupForm.get('otp');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  get dateOfBirth() {
    return this.signupForm.get('dateOfBirth');
  }

  get gender() {
    return this.signupForm.get('gender');
  }

  generateUsername() {
    const firstName = this.signupForm.get('firstName')?.value || '';
    const lastName = this.signupForm.get('lastName')?.value || '';
    let generatedUsername = `${firstName}.${lastName}`.toLowerCase();
    this.usernameSuggestions = [];

    if (!lastName) {
      generatedUsername = firstName.toLowerCase();
    }

    // Generate two suggestions
    this.usernameSuggestions.push(generatedUsername + '@gmail.com');
    this.usernameSuggestions.push(
      firstName.toLowerCase() + Math.floor(Math.random() * 1000) + '@gmail.com'
    );

    this.signupForm
      .get('username')
      ?.setValue(generatedUsername + '@gmail.com', { emitEvent: false });

    console.log(this.usernameSuggestions);
  }

  sendOtp() {
    debugger;
    const mobileControl = this.signupForm.get('mobileNumber');

    if (mobileControl) {
      const mobileNumber = mobileControl.value;

      // Basic mobile number validation - adjust the conditions to meet your requirements
      if (this.validateMobilePhoneNumber(mobileNumber)) {
        this.generatedOtp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP

        this.toastr.success(`Your OTP is: ${this.generatedOtp}`, 'OTP Sent');

        console.log(`Dummy OTP sent to ${mobileNumber}: ${this.generatedOtp}`);

        this.signupForm.get('otp')?.setValue(this.generatedOtp);
      } else {
        this.toastr.error('Please enter a valid mobile number', 'Warning');
      }
    } else {
      this.toastr.error('Mobile number field is missing', 'Warning');
    }
  }

  verifyOtp() {
    if (this.otp!.value === this.generatedOtp) {
      this.signupForm.get('isverified')?.setValue(true);
      this.toastr.success('OTP Verified Successfully', 'Success');
      this.isVerify = true;
    } else {
      this.toastr.error('Invalid OTP. Please try again', 'Error');
      this.isVerify = false;
    }
  }

  isNext: boolean = false;
  next() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
    } else {
      this.isNext = true;
    }
    console.log(this.signupForm.value);
  }

  isVerify: boolean = false;

  onSubmit() {
    debugger
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      console.log('Form is invalid');
    } else {
      const formValue = this.signupForm.value;
      const [year, month, day] = formValue.dateOfBirth.split('-');
      var request = {
        phone: formValue.mobileNumber.toString(),
        prefixPhone: '+91',
        email: formValue.username,
        password: formValue.password,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        bithDay: day,
        bithMonth: month,
        bithYear: year,
        gender: formValue.gender,
        isVerified: formValue.isverified,
      };

      this.httpService
        .postData(environment.user_auth_api, '/user/create-user', request)
        .subscribe((data) => {
          if (data?.isSuccess) {
            console.log(data);
            this.toastr.success('User created successfully', 'Success');
            this.router.navigate(['/sign-in']);
          } else {
            this.toastr.error(data?.message, 'Error');
          }
        });
    }
  }
  validatePreviousTab() {
    if (!this.isNext) {
      if (this.signupForm.pristine) {
        this.router.navigate(['/sign-in']);
      } else {
        let data = {
          type: 'confirm',
          message:
            'Are you sure you want to go back? Unsaved changes will be lost.',
          confirmText: 'Ok',
          cancelText: 'Cancel',
        };
        this.showAlert(data);
        this.alertComponentRef.instance.outputEvent.subscribe((res: any) => {
          if (res === 'Ok') {
            this.router.navigate(['/sign-in']);
          }
        });
      }
    } else {
      this.isNext = false;
    }
  }

  showAlert(data: confirmDialog) {
    const viewContainerRef = this.customTemplate.viewContainerRef;
    viewContainerRef.clear();
    this.alertComponentRef =
      viewContainerRef.createComponent<CustomTemplateComponent>(
        this.alertComponent[0]
      );
    this.alertComponentRef.instance.data = data;
  }

  validateMobilePhoneNumber(mobileNumber: string): boolean {
    mobileNumber = mobileNumber.toString();
    // Check if mobile number is not empty
    if (!mobileNumber || mobileNumber.trim().length === 0) {
      return false;
    }

    // Check if mobile number has exactly 10 digits
    if (mobileNumber.length !== 10) {
      return false;
    }

    // Check if mobile number contains only digits (no letters or other characters)
    if (!/^\d{10}$/.test(mobileNumber)) {
      return false;
    }

    // Validate that it starts with specific digits (7, 8, or 9)
    const phonePattern = /^[789]\d{9}$/;
    return phonePattern.test(mobileNumber);
  }
}
