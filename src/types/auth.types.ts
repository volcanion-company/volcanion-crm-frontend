// ============================================
// Authentication & User Types
// ============================================

// User Status for User Management module
export enum UserStatus {
  Active = 0,
  Inactive = 1,
  Deleted = 2,
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  phone?: string;
  role: UserRole; // Keep for auth compatibility
  roles?: string[]; // User Management module supports multiple roles
  status?: UserStatus; // User Management module
  tenantId: string;
  tenantName?: string;
  isActive: boolean; // For auth compatibility
  timeZone?: string;
  culture?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export enum UserRole {
  Admin = 'Admin',
  Manager = 'Manager',
  User = 'User',
}

// User Management Request Types
export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  timeZone?: string;
  culture?: string;
  roleIds?: string[];
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  timeZone?: string;
  culture?: string;
  roleIds?: string[];
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Tenant Types
export interface Tenant {
  id: string;
  name: string;
  companyName: string;
  domain?: string;
  isActive: boolean;
  createdAt: string;
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  tenantName: string;
  companyName: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tenantId: string;
  userId: string;
  user?: User;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}
