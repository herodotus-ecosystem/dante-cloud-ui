import type { BaseSysEntity, Conditions, EmptyObject } from '../base';
import { OAuth2Authority } from './authorize';
import { AuthorityTypeEnum } from '/@/enums';

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
  avatar?: string;
}

export interface SysDefaultRole extends BaseSysEntity {
  defaultId: string;
  scene: number | EmptyObject;
  role: SysRole;
}

export interface SysElement extends BaseSysEntity {
  elementId: string;
  parentId: string;
  path: string;
  name: string;
  component: string;
  title: string;
  redirect: string;
  type: string;
  icon: string;
  isHaveChild: boolean;
  isNotKeepAlive: boolean;
  isHideAllChild: boolean;
  isDetailContent: boolean;
  isIgnoreAuth: boolean;
  roles: Array<SysRole>;
}

export interface SysAuthorityConditions extends Conditions {}

export interface SysRoleConditions extends Conditions {}

export interface SysSecurityAttributeConditions extends Conditions {}

export interface SysUserConditions extends Conditions {}

export interface SysDefaultRoleConditions extends Conditions {}

export interface SysElementConditions extends Conditions {
  path: string;
}
