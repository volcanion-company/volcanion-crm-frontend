// ============================================
// Workflow Types
// ============================================

export enum WorkflowTriggerType {
  OnCreate = 'OnCreate',
  OnUpdate = 'OnUpdate',
  OnDelete = 'OnDelete',
  Scheduled = 'Scheduled',
}

export enum WorkflowActionType {
  SendEmail = 'SendEmail',
  CreateTask = 'CreateTask',
  UpdateField = 'UpdateField',
  CallWebhook = 'CallWebhook',
}

export interface WorkflowCondition {
  field: string;
  operator: string;
  value: string;
}

export interface WorkflowAction {
  type: WorkflowActionType;
  parameters: Record<string, unknown>;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  entityType: string;
  triggerType: WorkflowTriggerType;
  isActive: boolean;
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWorkflowRequest {
  name: string;
  description?: string;
  entityType: string;
  triggerType: WorkflowTriggerType;
  isActive?: boolean;
  conditions?: WorkflowCondition[];
  actions: WorkflowAction[];
}

export interface UpdateWorkflowRequest extends CreateWorkflowRequest {}
