import type { BaseSysEntity } from '../base';
import { OAuth2Authority } from './authorize';
import { AuthorityTypeEnum } from '/@/lib/enums';

export interface SysAuthority extends OAuth2Authority {
	authorityName?: string;
	authorityType?: AuthorityTypeEnum;
	className?: string;
	methodName?: string;
	menuClass?: string;
	parentId?: string;
}

export interface SysRole extends BaseSysEntity {
	roleId: string;
	roleCode: string;
	roleName: string;
	authorities: Array<SysAuthority>;
}

export interface SysSecurityAttribute extends BaseSysEntity {
	attributeId: string;
	url: string;
	requestMethod: string;
	serviceId: string;
	attributeCode: string;
	manualSetting: string;
	ipAddress: string;
	expression: string;
	roles: Set<SysRole>;
}

export interface SysUser extends BaseSysEntity {
	userId: string;
	userName: string;
	password: string;
	nickName: string;
	employeeId: string;
	roles: Array<SysRole>;
}

export interface SysDefaultRole extends BaseSysEntity {
	defaultId: string;
	scene: number | EmptyObject;
	role: SysRole;
}
