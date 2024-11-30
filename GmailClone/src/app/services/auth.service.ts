import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpCommonService } from './http.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { JwtDecode, LoginResponse } from '../models/UserModel';
import { AuthState } from '../states/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { token } from '../states/auth/auth.actions';
import { _connections } from '../shared/constant-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly jwtHelper = new JwtHelperService();
  constructor(
    private readonly http: HttpCommonService<any>,
    private readonly router: Router,
    private readonly cookieService: CookieService,
    private readonly store: Store<AuthState>
  ) {}

  login(
    url: string,
    email: string,
    password: string
  ): Observable<LoginResponse> {
    return this.http.postData(url, _connections._log_in, { email, password });
  }

  isAuthenticated(): boolean {
    const tokens = this.cookieService.get('AuthToken');
    if (tokens != null && tokens != undefined && tokens != '') {
      const decodedToken = this.decodeToken(tokens);
      const isTokenExpire = this.isTokenExpired(tokens);
      this.store.dispatch(
        token({ token: tokens, userDetails: decodedToken, isTokenExpire })
      );
    }
    return !!tokens && !this.jwtHelper.isTokenExpired(tokens);
  }

  logout(): void {
    this.cookieService.delete('AuthToken');
    this.router.navigate(['/']);
  }

  decodeToken(token: string): any {
    try {
      const decodedToken = jwt_decode.jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true; // Invalid token
    }
    const currentTime = Math.floor(new Date().getTime() / 1000);
    return decoded.exp < currentTime;
  }
}
