// ============================================
// Order Types
// ============================================

export enum OrderStatus {
  Draft = 0,
  Confirmed = 1,
  Processing = 2,
  Shipped = 3,
  Delivered = 4,
  Completed = 5,
  Cancelled = 6,
  Refunded = 7,
}

export enum PaymentStatus {
  Unpaid = 0,
  PartiallyPaid = 1,
  Paid = 2,
  Refunded = 3,
}

export interface OrderItem {
  id: string;
  productName: string;
  productSku?: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  discountType: string;
  tax: number;
  taxRate: number;
  subtotal: number;
  total: number;
  description?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName?: string;
  contactId?: string;
  contactName?: string;
  opportunityId?: string;
  opportunityName?: string;
  quotationId?: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  orderDate: string;
  expectedDeliveryDate?: string;
  actualDeliveryDate?: string;
  subtotal: number;
  discount: number;
  discountType?: string;
  tax: number;
  taxRate: number;
  shippingFee: number;
  total: number;
  paidAmount: number;
  balanceAmount: number;
  items: OrderItem[];
  shippingAddress?: string;
  billingAddress?: string;
  notes?: string;
  paymentTerms?: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  customerId: string;
  contactId?: string;
  opportunityId?: string;
  quotationId?: string;
  orderDate?: string;
  expectedDeliveryDate?: string;
  items: {
    productName: string;
    productSku?: string;
    quantity: number;
    unitPrice: number;
    discount?: number;
    discountType?: string;
    taxRate?: number;
    description?: string;
  }[];
  discount?: number;
  discountType?: string;
  taxRate?: number;
  shippingFee?: number;
  shippingAddress?: string;
  billingAddress?: string;
  notes?: string;
  paymentTerms?: string;
}

export interface UpdateOrderRequest extends Partial<CreateOrderRequest> {
  status?: OrderStatus;
  actualDeliveryDate?: string;
}

export interface RecordPaymentRequest {
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  reference?: string;
  notes?: string;
}
