// ============================================
// Tenant Types
// ============================================

export enum TenantStatus {
  Trial = 0,
  Active = 1,
  Suspended = 2,
  Inactive = 3,
  Deleted = 4,
}

export enum TenantPlan {
  Trial = 0,
  Free = 1,
  Professional = 2,
  Enterprise = 3,
}

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  status: TenantStatus;
  plan: TenantPlan;
  maxUsers: number;
  currentUsers?: number;
  maxStorageBytes: number;
  storageUsed?: number;
  logoUrl?: string;
  primaryColor?: string;
  timeZone?: string;
  culture?: string;
  createdAt: string;
  updatedAt?: string;
  trialEndsAt?: string;
}

export interface TenantListParams {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  status?: TenantStatus;
  plan?: TenantPlan;
  sortBy?: string;
  sortDescending?: boolean;
}

export interface CreateTenantRequest {
  name: string;
  subdomain: string;
  plan: TenantPlan;
  maxUsers: number;
  maxStorageBytes: number;
  primaryColor?: string;
  logoUrl?: string;
  timeZone?: string;
  culture?: string;
}

export interface UpdateTenantRequest {
  name?: string;
  plan?: TenantPlan;
  maxUsers?: number;
  maxStorageBytes?: number;
  status?: TenantStatus;
  primaryColor?: string;
  logoUrl?: string;
  timeZone?: string;
  culture?: string;
}

export interface TenantRegistrationRequest {
  companyName: string;
  subdomain: string;
  adminEmail: string;
  adminFirstName: string;
  adminLastName: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  industry?: string;
}

export interface TenantRegistrationResponse {
  tenantId: string;
  subdomain: string;
  url: string;
  adminUserId: string;
  trialEndsAt?: string;
}

// Subdomain validation constants
export const RESERVED_SUBDOMAINS = [
  'www',
  'api',
  'admin',
  'app',
  'mail',
  'ftp',
  'smtp',
  'pop',
  'imap',
  'webmail',
  'email',
  'blog',
  'forum',
  'shop',
  'store',
  'support',
  'help',
  'docs',
  'documentation',
  'status',
  'cdn',
  'static',
  'assets',
  'media',
  'upload',
  'download',
];

export const SUBDOMAIN_REGEX = /^[a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?$/;
export const SUBDOMAIN_MIN_LENGTH = 3;
export const SUBDOMAIN_MAX_LENGTH = 63;
