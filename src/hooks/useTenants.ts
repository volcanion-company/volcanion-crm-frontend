import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tenantService } from '@/services/tenant.service';
import { toast } from '@/lib/toast';
import type {
  Tenant,
  TenantListParams,
  CreateTenantRequest,
  UpdateTenantRequest,
  TenantRegistrationRequest,
} from '@/types';

const TENANTS_QUERY_KEY = 'tenants';

// Get all tenants with filters (Super Admin only)
export function useTenants(params?: TenantListParams) {
  return useQuery({
    queryKey: [TENANTS_QUERY_KEY, params],
    queryFn: () => tenantService.getTenants(params),
  });
}

// Get single tenant
export function useTenant(id: string) {
  return useQuery({
    queryKey: [TENANTS_QUERY_KEY, id],
    queryFn: () => tenantService.getTenantById(id),
    enabled: !!id,
  });
}

// Register tenant (Public - for new customer signup)
export function useRegisterTenant() {
  return useMutation({
    mutationFn: (data: TenantRegistrationRequest) => tenantService.registerTenant(data),
    onSuccess: (data) => {
      toast.success(
        'Đăng ký thành công',
        `Chào mừng bạn đến với hệ thống! Vui lòng kiểm tra email để kích hoạt tài khoản.`
      );
    },
    onError: (error: Error) => {
      toast.error('Không thể đăng ký', error.message || 'Đã xảy ra lỗi khi đăng ký tài khoản.');
    },
  });
}

// Create tenant (Super Admin only)
export function useCreateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTenantRequest) => tenantService.createTenant(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TENANTS_QUERY_KEY] });
      toast.success('Tạo tenant thành công', 'Tenant mới đã được tạo trong hệ thống.');
    },
    onError: (error: Error) => {
      toast.error('Không thể tạo tenant', error.message || 'Đã xảy ra lỗi khi tạo tenant.');
    },
  });
}

// Update tenant
export function useUpdateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTenantRequest }) =>
      tenantService.updateTenant(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [TENANTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [TENANTS_QUERY_KEY, variables.id] });
      toast.success('Cập nhật tenant thành công', 'Thông tin tenant đã được cập nhật.');
    },
    onError: (error: Error) => {
      toast.error('Không thể cập nhật tenant', error.message || 'Đã xảy ra lỗi khi cập nhật tenant.');
    },
  });
}

// Delete tenant (soft delete)
export function useDeleteTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tenantService.deleteTenant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TENANTS_QUERY_KEY] });
      toast.success(
        'Xóa tenant thành công',
        'Tenant đã được đánh dấu xóa. Dữ liệu sẽ được xóa vĩnh viễn sau 30 ngày.'
      );
    },
    onError: (error: Error) => {
      toast.error('Không thể xóa tenant', error.message || 'Đã xảy ra lỗi khi xóa tenant.');
    },
  });
}

// Check subdomain availability (for validation)
export function useCheckSubdomain(subdomain: string, enabled = false) {
  return useQuery({
    queryKey: ['subdomain-check', subdomain],
    queryFn: () => tenantService.checkSubdomainAvailability(subdomain),
    enabled: enabled && subdomain.length >= 3, // Only check if enabled and subdomain is valid length
    staleTime: 5000, // Cache for 5 seconds
  });
}
