// ============================================
// Campaign Types
// ============================================

import type { WorkflowCondition } from './workflow.types';

export enum CampaignType {
  Email = 'Email',
  SMS = 'SMS',
  Social = 'Social',
  Event = 'Event',
  Webinar = 'Webinar',
  Advertisement = 'Advertisement',
  Other = 'Other',
}

export enum CampaignStatus {
  Draft = 'Draft',
  Scheduled = 'Scheduled',
  InProgress = 'InProgress',
  Paused = 'Paused',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  type: CampaignType;
  status: CampaignStatus;
  startDate?: string;
  endDate?: string;
  budget?: number;
  actualCost?: number;
  currency?: string;
  expectedRevenue?: number;
  actualRevenue?: number;
  expectedLeads?: number;
  expectedConversions?: number;
  totalSent?: number;
  totalDelivered?: number;
  totalOpened?: number;
  totalClicked?: number;
  totalBounced?: number;
  totalUnsubscribed?: number;
  totalLeadsGenerated?: number;
  totalConversions?: number;
  ownerId?: string;
  ownerName?: string;
  targetAudience?: string;
  tags?: string;
  subject?: string;
  content?: string;
  segmentId?: string;
  scheduledDate?: string;
  sentDate?: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCampaignRequest {
  name: string;
  description?: string;
  type: CampaignType;
  startDate?: string;
  endDate?: string;
  budget?: number;
  currency?: string;
  expectedRevenue?: number;
  expectedLeads?: number;
  expectedConversions?: number;
  targetAudience?: string;
  tags?: string;
  subject?: string;
  content?: string;
  segmentId?: string;
  scheduledDate?: string;
  ownerId?: string;
}

export interface CampaignPerformance {
  campaignId: string;
  campaignName: string;
  status: CampaignStatus;
  budget?: number;
  actualCost?: number;
  expectedRevenue?: number;
  actualRevenue?: number;
  roi?: number;
  totalSent?: number;
  totalDelivered?: number;
  totalOpened?: number;
  totalClicked?: number;
  totalLeadsGenerated?: number;
  totalConversions?: number;
  openRate?: number;
  clickRate?: number;
  conversionRate?: number;
}

export interface UpdateCampaignMetricsRequest {
  actualCost?: number;
  actualRevenue?: number;
  totalSent?: number;
  totalDelivered?: number;
  totalOpened?: number;
  totalClicked?: number;
  totalBounced?: number;
  totalUnsubscribed?: number;
  totalLeadsGenerated?: number;
  totalConversions?: number;
}

export interface Segment {
  id: string;
  name: string;
  description?: string;
  criteria: WorkflowCondition[];
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSegmentRequest {
  name: string;
  description?: string;
  criteria: WorkflowCondition[];
}
