import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpCommonService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as SignUpActions from './signup.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { _connections } from '../../shared/constant-data';

@Injectable()
export class SignUpEffects {
  actions$ = inject(Actions);

  constructor(
    private httpService: HttpCommonService<any>,
    private toastr: ToastrService,
    private router: Router
  ) {}

  signupUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignUpActions.signupUser),
      mergeMap((action) =>
        this.httpService
          .postData(
            environment.user_auth_api,
            _connections._sign_up,
            action.user
          )
          .pipe(
            map((response) => {
              this.toastr.success('User created successfully', 'Success');
              this.router.navigate(['/sign-in']);
              return SignUpActions.signupUserSuccess({ response });
            }),
            catchError((error) => {
              this.toastr.error('Error creating user', 'Error');
              return of(SignUpActions.signupUserFailure({ error }));
            })
          )
      )
    )
  );

  sendOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignUpActions.sendOtp),
      mergeMap((action) => {
        const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
        this.toastr.success(`Your OTP is: ${generatedOtp}`, 'OTP Sent');
        return of(SignUpActions.sendOtpSuccess({ otp: generatedOtp }));
      })
    )
  );
}
