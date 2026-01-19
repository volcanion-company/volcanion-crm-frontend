// ============================================
// Contact Types
// ============================================

export enum ContactStatus {
  Active = 0,
  Inactive = 1,
  Unsubscribed = 2,
}

export interface Contact {
  id: string;
  customerId?: string;
  customerName?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  mobile?: string;
  jobTitle?: string;
  department?: string;
  isPrimary: boolean;
  status: ContactStatus;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  linkedInUrl?: string;
  notes?: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactRequest {
  customerId?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  mobile?: string;
  jobTitle?: string;
  department?: string;
  isPrimary?: boolean;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  linkedInUrl?: string;
  notes?: string;
}

export interface UpdateContactRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  jobTitle?: string;
  department?: string;
  customerId?: string;
  isPrimary?: boolean;
  status?: ContactStatus;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  linkedInUrl?: string;
  notes?: string;
}
