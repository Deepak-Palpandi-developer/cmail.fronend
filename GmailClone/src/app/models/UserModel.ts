export class User {
  id: string = '';
  userEmail: string = '';
  iat: number = 0;
  exp: number = 0;
  gender: string = '';
  phone: string = '';
  userName: string = '';
  lastLogin: string = '';
  lastLoginDate: string = '';
  profileImage: string = '';
}

export interface JwtDecode {
  isExpires: boolean;
  user: User;
}
