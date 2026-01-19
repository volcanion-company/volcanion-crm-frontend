// ============================================
// Lead Types
// ============================================

export enum LeadStatus {
  New = 0,
  Contacted = 1,
  Qualified = 2,
  Unqualified = 3,
  Converted = 4,
  Lost = 5,
}

export enum LeadSource {
  Website = 0,
  Referral = 1,
  SocialMedia = 2,
  Email = 3,
  Phone = 4,
  TradeShow = 5,
  Partner = 6,
  Advertisement = 7,
  ColdCall = 8,
  Other = 9,
}

export enum LeadRating {
  Cold = 0,
  Warm = 1,
  Hot = 2,
}

export interface Lead {
  id: string;
  title: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  email?: string;
  phone?: string;
  mobile?: string;
  companyName?: string;
  jobTitle?: string;
  industry?: string;
  employeeCount?: number;
  addressLine1?: string;
  city?: string;
  state?: string;
  country?: string;
  status: LeadStatus;
  source?: LeadSource;
  sourceDetail?: string;
  rating: LeadRating;
  score: number;
  estimatedValue?: number;
  description?: string;
  assignedToUserId?: string;
  assignedToUserName?: string;
  assignedAt?: string;
  convertedToCustomerId?: string;
  convertedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeadRequest {
  title: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  companyName?: string;
  jobTitle?: string;
  industry?: string;
  employeeCount?: number;
  addressLine1?: string;
  city?: string;
  state?: string;
  country?: string;
  source?: LeadSource;
  sourceDetail?: string;
  estimatedValue?: number;
  description?: string;
  assignedToUserId?: string;
}

export interface UpdateLeadRequest {
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  status?: LeadStatus;
  rating?: LeadRating;
  score?: number;
  estimatedValue?: number;
  description?: string;
}

export interface AssignLeadRequest {
  userId: string;
}

export interface ConvertLeadRequest {
  customerName?: string;
  createOpportunity?: boolean;
  opportunityName?: string;
}

export interface ConvertLeadResponse {
  customerId: string;
  opportunityId?: string;
}
