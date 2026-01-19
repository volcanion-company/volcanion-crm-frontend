import { httpClient } from '@/lib/http-client';
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  RefreshTokenRequest,
  User,
} from '@/types';

// Backend API response wrapper type
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface UpdateProfileRequest {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  timeZone?: string;
  culture?: string;
}

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await httpClient.post<ApiResponse<AuthResponse>>('/api/v1/auth/login', credentials);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await httpClient.post<ApiResponse<AuthResponse>>('/api/v1/tenants/register', data);
    return response.data;
  },

  refresh: async (data: RefreshTokenRequest): Promise<AuthResponse> => {
    const response = await httpClient.post<ApiResponse<AuthResponse>>('/api/v1/auth/refresh', data);
    return response.data;
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<User> => {
    const response = await httpClient.put<ApiResponse<User>>('/api/v1/auth/profile', data);
    return response.data;
  },

  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    await httpClient.put<ApiResponse<void>>('/api/v1/auth/change-password', data);
  },

  logout: async (): Promise<void> => {
    httpClient.clearAuthToken();
  },
};
