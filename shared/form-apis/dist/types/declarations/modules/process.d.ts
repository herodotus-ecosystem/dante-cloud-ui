import { BaseMongoEntity, Conditions } from '../base';
import { FormModeler } from './engine';
export interface DynamicFormEntity extends BaseMongoEntity {
    name: string;
    activityName: string;
    modeler: FormModeler;
}
export interface ProcessCommentsEntity extends BaseMongoEntity {
    username?: string;
    userId: string;
    processInstanceId: string;
    taskId: string;
    activityId?: string;
    activityName?: string;
    message?: string;
    fullMessage: string;
    tenantId?: string;
}
export interface ProcessSpecificsEntity extends BaseMongoEntity {
    processDefinitionId?: string;
    processDefinitionKey?: string;
    tenantId?: string;
    taskId?: string;
    activityId?: string;
    activityName?: string;
    created: boolean;
    state: Record<string, any>;
    comments: Array<ProcessCommentsEntity>;
}
export interface DynamicFormConditions extends Conditions {
}
export interface ProcessCommentsConditions extends Conditions {
}
export interface ProcessSpecificsConditions extends Conditions {
}
