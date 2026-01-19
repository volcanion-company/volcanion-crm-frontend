// ============================================
// Quotation Types
// ============================================

export enum QuotationStatus {
  Draft = 0,
  Sent = 1,
  Accepted = 2,
  Rejected = 3,
  Expired = 4,
  Converted = 5,
}

export interface QuotationItem {
  id: string;
  productId?: string;
  productName: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  taxPercent: number;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  total: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  customerId: string;
  customerName?: string;
  contactId?: string;
  contactName?: string;
  opportunityId?: string;
  opportunityName?: string;
  status: QuotationStatus;
  quotationDate: string;
  expiryDate: string;
  currency: string;
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  taxAmount: number;
  total: number;
  items: QuotationItem[];
  terms?: string;
  notes?: string;
  sentAt?: string;
  acceptedAt?: string;
  rejectedAt?: string;
  rejectedReason?: string;
  convertedOrderId?: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateQuotationRequest {
  customerId: string;
  contactId?: string;
  opportunityId?: string;
  quotationDate?: string;
  expiryDate: string;
  currency?: string;
  items: {
    productId?: string;
    productName: string;
    description?: string;
    quantity: number;
    unitPrice: number;
    discountPercent?: number;
    taxPercent?: number;
  }[];
  discountPercent?: number;
  terms?: string;
  notes?: string;
}

export interface UpdateQuotationRequest extends Partial<CreateQuotationRequest> {}
