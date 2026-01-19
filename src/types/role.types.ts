// ============================================
// Roles & Permissions Types
// ============================================

export enum DataScope {
  AllInOrganization = 0,
  Department = 1,
  TeamOnly = 2,
  OnlyOwn = 3,
}

export interface Permission {
  id: string;
  name: string;
  code: string;
  module: string;
  description?: string;
}

export interface PermissionModule {
  module: string;
  permissions: Permission[];
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  isSystemRole: boolean;
  dataScope: DataScope;
  permissionCount?: number;
  permissions?: Permission[];
  createdAt: string;
  updatedAt?: string;
}

export interface CreateRoleRequest {
  name: string;
  description?: string;
  dataScope: DataScope;
  permissionIds?: string[];
}

export interface UpdateRoleRequest {
  name?: string;
  description?: string;
  dataScope?: DataScope;
}

export interface UpdateRolePermissionsRequest {
  permissionIds: string[];
}
