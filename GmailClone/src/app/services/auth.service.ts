import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpCommonService } from './http.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, of } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { JwtDecode } from '../models/UserModel';
import { Store } from '@ngrx/store';
import { addUsers } from '../state-management/actions/user.actions';
import { StorePushService } from '../shared/store.push.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly jwtHelper = new JwtHelperService();
  constructor(
    private readonly http: HttpCommonService<any>,
    private readonly router: Router,
    private readonly cookieService: CookieService,
    private readonly setorePushService: StorePushService
  ) {}

  login(url: string, email: string, password: string): Observable<boolean> {
    return this.http.postData(url, '/user/log-in', { email, password }).pipe(
      map((data: any) => {
        if (data?.isSuccess) {
          this.cookieService.set('AuthToken', data?.data);
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => of(false))
    );
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('AuthToken');
    if (!this.jwtHelper.isTokenExpired(token)) {
      this.setUserDetailsInState();
    } else {
      this.cookieService.delete('AuthToken');
    }
    return !!token && !this.jwtHelper.isTokenExpired(token);
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

  isTokenExpired(): boolean {
    const token = this.cookieService.get('AuthToken');
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true; // Invalid token
    }
    const currentTime = Math.floor(new Date().getTime() / 1000);
    return decoded.exp < currentTime;
  }

  setUserDetailsInState() {
    const details = this.getJwrUserDetails();
    this.setorePushService.setUserDetails(details.user);
  }

  getJwrUserDetails(): JwtDecode {
    const token = this.cookieService.get('AuthToken');
    const userDetails = {
      user: this.decodeToken(token),
      isExpires: this.isTokenExpired(),
    };
    return userDetails;
  }
}
