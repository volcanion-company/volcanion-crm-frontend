// ============================================
// Ticket Types
// ============================================

export enum TicketStatus {
  New = 0,
  Open = 1,
  InProgress = 2,
  Pending = 3,
  OnHold = 4,
  Resolved = 5,
  Closed = 6,
  Reopened = 7,
}

export enum TicketPriority {
  Low = 0,
  Medium = 1,
  High = 2,
  Critical = 3,
}

export enum TicketType {
  Question = 0,
  Problem = 1,
  Incident = 2,
  FeatureRequest = 3,
  Task = 4,
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  subject: string;
  description?: string;
  customerId?: string;
  customerName?: string;
  contactId?: string;
  contactName?: string;
  status: TicketStatus;
  priority: TicketPriority;
  type: TicketType;
  channel?: string;
  category?: string;
  subCategory?: string;
  assignedToUserId?: string;
  assignedToUserName?: string;
  slaId?: string;
  slaName?: string;
  dueDate?: string;
  firstResponseDate?: string;
  resolvedDate?: string;
  closedDate?: string;
  satisfactionRating?: number;
  satisfactionComment?: string;
  slaBreached: boolean;
  slaPaused: boolean;
  slaPausedMinutes: number;
  escalationCount: number;
  tags?: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketRequest {
  subject: string;
  description?: string;
  customerId?: string;
  contactId?: string;
  type?: TicketType;
  priority?: TicketPriority;
  channel?: string;
  slaId?: string;
  assignedToUserId?: string;
  tags?: string;
  dueDate?: string;
}

export interface UpdateTicketRequest {
  subject?: string;
  description?: string;
  priority?: TicketPriority;
  type?: TicketType;
  dueDate?: string;
}

export interface AssignTicketRequest {
  userId: string;
}

export interface PauseSLARequest {
  reason: string;
}
