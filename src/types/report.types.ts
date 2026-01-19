// ============================================
// Report Types
// ============================================

export interface SalesPipelineReport {
  totalValue: number;
  totalDeals: number;
  winRate: number;
  averageDealSize: number;
  dealsByStage: Record<string, number>;
  forecastedRevenue: number;
}

export interface LeadConversionReport {
  totalLeads: number;
  convertedLeads: number;
  conversionRate: number;
  leadsByStatus: Record<string, number>;
  conversionFunnel: {
    stage: string;
    count: number;
    conversionRate: number;
  }[];
}

export interface TicketAnalyticsReport {
  totalTickets: number;
  openTickets: number;
  averageResolutionTime: number;
  averageFirstResponseTime: number;
  slaCompliance: number;
  ticketsByPriority: Record<string, number>;
  ticketsByStatus: Record<string, number>;
}

export interface UserActivityReport {
  userId: string;
  userName: string;
  activitiesCreated: number;
  tasksCompleted: number;
  dealsClosed: number;
  totalRevenue: number;
}
