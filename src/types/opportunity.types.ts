// ============================================
// Opportunity Types
// ============================================

export enum OpportunityStage {
  Prospecting = 0,
  Qualification = 1,
  Proposal = 2,
  Negotiation = 3,
  ClosedWon = 4,
  ClosedLost = 5,
}

export enum OpportunityType {
  NewBusiness = 0,
  ExistingBusiness = 1,
  Renewal = 2,
}

export interface Opportunity {
  id: string;
  name: string;
  customerId: string;
  customerName?: string;
  contactId?: string;
  contactName?: string;
  amount: number;
  probability: number;
  weightedAmount: number;
  stage: OpportunityStage;
  type: OpportunityType;
  expectedCloseDate?: string;
  actualCloseDate?: string;
  description?: string;
  competitors?: string;
  nextSteps?: string;
  lossReason?: string;
  assignedToUserId?: string;
  assignedToUserName?: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOpportunityRequest {
  name: string;
  customerId: string;
  contactId?: string;
  amount: number;
  probability?: number;
  stage?: OpportunityStage;
  type?: OpportunityType;
  expectedCloseDate?: string;
  description?: string;
  competitors?: string;
  nextSteps?: string;
  assignedToUserId?: string;
}

export interface UpdateOpportunityRequest extends Partial<CreateOpportunityRequest> {
  stage?: OpportunityStage;
  actualCloseDate?: string;
  lossReason?: string;
}
