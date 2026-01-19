// ============================================
// Contract Types
// ============================================

export enum ContractType {
  Service = 0,
  Subscription = 1,
  Support = 2,
  License = 3,
  Maintenance = 4,
  Other = 5,
}

export enum ContractStatus {
  Draft = 0,
  PendingApproval = 1,
  Approved = 2,
  Active = 3,
  Expired = 4,
  Cancelled = 5,
  Renewed = 6,
}

export enum BillingFrequency {
  OneTime = 0,
  Monthly = 1,
  Quarterly = 2,
  SemiAnnually = 3,
  Annually = 4,
}

export interface Contract {
  id: string;
  contractNumber: string;
  title: string;
  customerId: string;
  customerName?: string;
  orderId?: string;
  orderNumber?: string;
  type: ContractType;
  status: ContractStatus;
  value: number;
  billingFrequency: BillingFrequency;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  renewalPeriodMonths: number;
  noticePeriodDays: number;
  renewalDate?: string;
  renewedContractId?: string;
  previousContractId?: string;
  terms?: string;
  notes?: string;
  documentUrl?: string;
  approvedBy?: string;
  approvedAt?: string;
  cancelledReason?: string;
  cancelledAt?: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContractRequest {
  title: string;
  customerId: string;
  orderId?: string;
  type: ContractType;
  value: number;
  billingFrequency: BillingFrequency;
  startDate: string;
  endDate: string;
  autoRenew?: boolean;
  renewalPeriodMonths?: number;
  noticePeriodDays?: number;
  terms?: string;
  notes?: string;
  documentUrl?: string;
}

export interface UpdateContractRequest extends Partial<CreateContractRequest> {
  status?: ContractStatus;
}
