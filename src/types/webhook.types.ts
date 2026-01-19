// ============================================
// Webhook Types
// ============================================

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  isActive: boolean;
  secret: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWebhookRequest {
  url: string;
  events: string[];
  isActive?: boolean;
  secret: string;
}

export interface UpdateWebhookRequest extends CreateWebhookRequest {}

export interface WebhookDelivery {
  id: string;
  webhookId: string;
  eventType: string;
  payload: Record<string, unknown>;
  status: string;
  statusCode?: number;
  response?: string;
  attemptCount: number;
  timestamp: string;
}
