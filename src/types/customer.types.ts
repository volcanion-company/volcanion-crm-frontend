// ============================================
// Customer Types
// ============================================

import type { Contact } from './contact.types';

export enum CustomerType {
  Individual = 0,
  Business = 1,
}

export enum CustomerStatus {
  Prospect = 0,
  Active = 1,
  Inactive = 2,
  Churned = 3,
}

export enum CustomerSource {
  Direct = 0,
  Referral = 1,
  Website = 2,
  SocialMedia = 3,
  Advertisement = 4,
  TradeShow = 5,
  Partner = 6,
  Other = 7,
}

export interface Customer {
  id: string;
  name: string;
  type: CustomerType;
  email?: string;
  phone?: string;
  mobile?: string;
  website?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  dateOfBirth?: string;
  companyName?: string;
  taxId?: string;
  industry?: string;
  employeeCount?: number;
  annualRevenue?: number;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  status: CustomerStatus;
  source?: CustomerSource;
  sourceDetail?: string;
  customerCode?: string;
  lifetimeValue?: number;
  notes?: string;
  assignedToUserId?: string;
  assignedToUserName?: string;
  contacts?: Contact[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerRequest {
  name: string;
  type?: CustomerType;
  email?: string;
  phone?: string;
  mobile?: string;
  website?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  dateOfBirth?: string;
  companyName?: string;
  taxId?: string;
  industry?: string;
  employeeCount?: number;
  annualRevenue?: number;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  status?: CustomerStatus;
  source?: CustomerSource;
  sourceDetail?: string;
  customerCode?: string;
  assignedToUserId?: string;
  notes?: string;
}

export interface UpdateCustomerRequest extends Partial<CreateCustomerRequest> {}
