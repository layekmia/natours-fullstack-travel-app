export type UserRole = 'user' | 'guide' | 'lead-guide' | 'admin';

export interface User {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  passwordChangedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  photo?: File;
}

export interface UpdatePasswordData {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}