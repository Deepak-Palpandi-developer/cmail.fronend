export class User {
  id?: string = '';
  userEmail?: string = '';
  iat?: number = 0;
  exp?: number = 0;
  gender?: string = '';
  phone?: string = '';
  userName?: string = '';
  lastLogin?: string = '';
  lastLoginDate?: string = '';
  profileImage?: string = '';
}

export interface JwtDecode {
  isExpires: boolean;
  user: User;
}

export class LoginRequest {
  email: string = '';
  password: string = '';
}

export class LoginResponse {
  isSuccess: boolean = false;
  message: string = '';
  data: string = '';
}

export class SignUp {
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  mobileNumber: number = 0;
  otp: string = '';
  dateOfBirth: string = '';
  isverified: boolean = false;
  gender: string = '';
  bithDay?: Number = 0;
  bithMonth?: number = 0;
  bithYear?: number = 0;
}
