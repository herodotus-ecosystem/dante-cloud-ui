import type { BaseSysEntity, Conditions } from '../base';

export interface LeaveFlow extends BaseSysEntity {
  flowId: string;
  beginTime: Date;
  endTime: Date;
  days: number;
  reason: string;
}

export interface LeaveFlowConditions extends Conditions {}
