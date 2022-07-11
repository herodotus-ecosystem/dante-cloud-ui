import { StatusEnum, ApplicationEnum } from '/@/lib/enums';

export interface Entity {}

export interface Conditions {}

export interface BaseEntity extends Entity {
	createTime: Date;
	updateTime: Date;
	ranking: number;
}

export interface BaseSysEntity extends BaseEntity {
	status: StatusEnum;
	reserved: boolean;
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

export type ConstantDictionary = {
	key: string;
	text: string;
	value: number;
};

export type Page<T extends Entity> = {
	content: T[];
	totalElements: string;
	totalPages: number;
};

export interface Sort {
	direction: 'ASC' | 'DESC';
	properties: Array<string>;
}

export interface Pageable extends Sort {
	pageNumber: number;
	pageSize: number;
}

export interface ValidateField {
	valid: boolean;
	errors: Array<string>;
}

export interface ValidateResult {
	valid: boolean;
	result: Record<string, ValidateField>;
	errors: Record<string, string>;
}
