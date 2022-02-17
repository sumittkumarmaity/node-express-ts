export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  otp: number;
  isEmailVerified: boolean;
  isActive: boolean
}
