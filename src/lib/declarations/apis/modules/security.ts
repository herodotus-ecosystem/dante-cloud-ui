import type { BaseSysEntity } from './base';
import { AuthorityType } from '/@/lib/enums';

export interface SysAuthority extends BaseSysEntity {
	authorityId: string;
	authorityCode: string;
	authorityName: string;
	requestMethod: string;
	authorityType: AuthorityType;
	serviceId: string;
	className: string;
	methodName: string;
	url: string;
	menuClass: string;
	parentId: string;
}
