// ============================================
// Activity Types
// ============================================

import type { Contact } from './contact.types';
import type { Deal } from './deal.types';

export enum ActivityType {
  Call = 'Call',
  Email = 'Email',
  Meeting = 'Meeting',
  Task = 'Task',
  Note = 'Note',
  Deadline = 'Deadline',
}

export enum ActivityStatus {
  Planned = 'Planned',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export enum ActivityPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface Activity {
  id: string;
  type: ActivityType;
  status: ActivityStatus;
  priority: ActivityPriority;
  subject: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  dueDate?: string;
  isCompleted: boolean;
  contactId?: string;
  contact?: Contact;
  dealId?: string;
  deal?: Deal;
  relatedToType?: string;
  relatedToId?: string;
  relatedToName?: string;
  assignedToName?: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

export interface CreateActivityRequest {
  type: ActivityType;
  subject: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  dueDate?: string;
  contactId?: string;
  dealId?: string;
}

export interface UpdateActivityRequest extends CreateActivityRequest {}
