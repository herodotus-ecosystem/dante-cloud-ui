import { Entity } from './base';
import { StatusEnum, ApplicationEnum } from './enums';

export interface BaseEntity extends Entity {
    createTime: Date;
    updateTime: Date;
    ranking: number;
}

export interface BaseSysEntity extends BaseEntity {
    status: StatusEnum;
    isReserved: boolean;
    reversion: number;
    description: string;
}

export interface BaseAppEntity extends BaseSysEntity {
    appSecret: string;
    appName: string;
    appCode: string;
    applicationType: ApplicationEnum;
}

export interface BaseBpmnParam extends Entity {}

export interface BaseBpmnQueryParam extends BaseBpmnParam {}
export interface BpmnPageParam {
    sortBy: string;
    sortOrder: string;
    firstResult: number;
    maxResults: number;
}

export type BpmnPageableParam<P extends BaseBpmnQueryParam> = P & BpmnPageParam;

export interface BaseBpmnEntity extends Entity {}
