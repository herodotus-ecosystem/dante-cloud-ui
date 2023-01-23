import type { Entity, Conditions } from '../base';

export interface ExtendedTask extends Entity {
  taskId: string;
  activityId: string;
  activityName: string;
  tenantId: string;
  businessKey: string;
  processDefinitionId: string;
  processInstanceId: string;
  executionId: string;
  startTime: Date;
  endTime: Date;
  assigneeName: string;
  ownerName: string;
  assigneeId: string;
  ownerId: string;
}

export interface ExtendedTaskConditions extends Conditions {
  employeeId: string;
}
