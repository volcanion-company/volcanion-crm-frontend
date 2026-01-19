// ============================================
// Deal Types
// ============================================

import type { Contact } from './contact.types';
import type { Company } from './company.types';

export enum DealStage {
  Qualification = 'Qualification',
  Proposal = 'Proposal',
  Negotiation = 'Negotiation',
  Closing = 'Closing',
  Won = 'Won',
  Lost = 'Lost',
}

export interface Deal {
  id: string;
  name: string;
  amount: number;
  stage: DealStage;
  probability: number;
  expectedCloseDate?: string;
  contactId?: string;
  contact?: Contact;
  companyId?: string;
  company?: Company;
  description?: string;
  lostReason?: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
}

export interface CreateDealRequest {
  name: string;
  amount: number;
  stage?: DealStage;
  probability?: number;
  expectedCloseDate?: string;
  contactId?: string;
  companyId?: string;
  description?: string;
}

export interface UpdateDealRequest extends CreateDealRequest {}

export interface LoseDealRequest {
  lostReason: string;
}
