import { httpClient } from '@/lib/http-client';
import type {
  Tenant,
  TenantListParams,
  CreateTenantRequest,
  UpdateTenantRequest,
  TenantRegistrationRequest,
  TenantRegistrationResponse,
  PaginatedResponse,
} from '@/types';

// Backend API response wrapper
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

// Backend uses different field names for pagination
interface BackendPaginatedResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export const tenantService = {
  // Get all tenants with pagination and filters (Super Admin only)
  async getTenants(params?: TenantListParams): Promise<PaginatedResponse<Tenant>> {
    const backendParams = {
      pageNumber: params?.pageNumber || 1,
      pageSize: params?.pageSize || 10,
      searchTerm: params?.searchTerm,
      status: params?.status,
      plan: params?.plan,
      sortBy: params?.sortBy,
      sortDescending: params?.sortDescending,
    };

    const response = await httpClient.get<ApiResponse<BackendPaginatedResponse<any>>>(
      '/api/v1/tenants',
      { params: backendParams }
    );

    const backendData = response.data;

    // Map backend field names to frontend
    const items = backendData.items.map((item: any) => ({
      ...item,
      currentUsers: item.userCount ?? item.currentUsers,
    }));

    // Transform backend pagination to frontend format
    return {
      items: items,
      page: backendData.pageNumber,
      pageSize: backendData.pageSize,
      totalPages: backendData.totalPages,
      totalCount: backendData.totalCount,
      hasNextPage: backendData.hasNextPage,
      hasPreviousPage: backendData.hasPreviousPage,
    };
  },

  // Get tenant by ID
  async getTenantById(id: string): Promise<Tenant> {
    const response = await httpClient.get<ApiResponse<any>>(`/api/v1/tenants/${id}`);
    const data = response.data;
    
    // Map backend field names to frontend
    return {
      ...data,
      currentUsers: data.userCount ?? data.currentUsers,
    };
  },

  // Register tenant (Public endpoint - AllowAnonymous)
  async registerTenant(data: TenantRegistrationRequest): Promise<TenantRegistrationResponse> {
    const response = await httpClient.post<ApiResponse<TenantRegistrationResponse>>(
      '/api/v1/tenants/register',
      data
    );
    return response.data;
  },

  // Create tenant (Super Admin only)
  async createTenant(data: CreateTenantRequest): Promise<Tenant> {
    const response = await httpClient.post<ApiResponse<Tenant>>('/api/v1/tenants', data);
    return response.data;
  },

  // Update tenant
  async updateTenant(id: string, data: UpdateTenantRequest): Promise<Tenant> {
    const response = await httpClient.put<ApiResponse<Tenant>>(`/api/v1/tenants/${id}`, data);
    return response.data;
  },

  // Delete tenant (soft delete)
  async deleteTenant(id: string): Promise<void> {
    await httpClient.delete(`/api/v1/tenants/${id}`);
  },

  // Check subdomain availability (helper for validation)
  async checkSubdomainAvailability(subdomain: string): Promise<boolean> {
    try {
      // If we can get tenants list and filter by subdomain
      const response = await httpClient.get<ApiResponse<BackendPaginatedResponse<Tenant>>>(
        '/api/v1/tenants',
        {
          params: {
            searchTerm: subdomain,
            pageSize: 1,
          },
        }
      );
      
      const backendData = response.data;
      
      // Check if exact subdomain match exists
      const exactMatch = backendData.items.find(
        (t: Tenant) => t.subdomain.toLowerCase() === subdomain.toLowerCase()
      );
      
      return !exactMatch; // Available if no exact match
    } catch (error) {
      // If error, assume unavailable to be safe
      return false;
    }
  },
};
