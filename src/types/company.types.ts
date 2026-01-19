// ============================================
// Company Types
// ============================================

export interface Company {
  id: string;
  name: string;
  industry?: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  employeeCount?: number;
  annualRevenue?: number;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCompanyRequest {
  name: string;
  industry?: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  employeeCount?: number;
  annualRevenue?: number;
}

export interface UpdateCompanyRequest extends CreateCompanyRequest {}
