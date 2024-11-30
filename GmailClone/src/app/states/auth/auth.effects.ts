import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';
import { of, catchError, map, mergeMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly cookieService: CookieService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ request }) =>
        this.authService
          .login(environment.user_auth_api, request.email, request.password)
          .pipe(
            map((response) => {
              if (response.isSuccess) {
                const decodedToken = this.authService.decodeToken(
                  response.data
                );
                const isTokenExpire = this.authService.isTokenExpired(
                  response.data
                );
                this.cookieService.set('AuthToken', response?.data);
                let token = response.data;
                return AuthActions.loginSuccess({
                  token: token,
                  userDetails: decodedToken,
                  isTokenExpire: isTokenExpire,
                });
              } else {
                return AuthActions.loginFailure({
                  error: 'Invalid username or password. Please try again',
                });
              }
            }),
            catchError((error) =>
              of(
                AuthActions.loginFailure({
                  error: 'An error occurred while logging in',
                })
              )
            )
          )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.toastr.success('Login successful');
          this.router.navigate(['/dash-board']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
          this.cookieService.delete('AuthToken');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
}
