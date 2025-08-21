import { BaseSysEntity, Conditions, EmptyObject } from '../base';
import { SysEmployeeEntity } from './hr';
export interface SysPermissionEntity extends BaseSysEntity {
    permissionId: string;
    permissionName: string;
    permissionCode: string;
}
export interface SysRoleEntity extends BaseSysEntity {
    roleId: string;
    roleCode: string;
    roleName: string;
    permissions: Array<SysPermissionEntity>;
}
export interface SysUserEntity extends BaseSysEntity {
    userId: string;
    username: string;
    password: string;
    nickname: string;
    employee: SysEmployeeEntity;
    roles: Array<SysRoleEntity>;
    avatar?: string;
}
export interface SysAttributeEntity extends BaseSysEntity {
    attributeId: string;
    attributeCode: string;
    requestMethod: string;
    serviceId: string;
    className: string;
    methodName: string;
    url: string;
    webExpression: string;
    permissions: Array<SysPermissionEntity>;
}
export interface SysDefaultRoleEntity extends BaseSysEntity {
    defaultId: string;
    scene: number | EmptyObject;
    role: SysRoleEntity;
}
export interface SysElementEntity extends BaseSysEntity {
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
    roles: Array<SysRoleEntity>;
}
export interface SysTenantDataSourceEntity extends BaseSysEntity {
    datasourceId: string;
    tenantId: string;
    username: string;
    password: string;
    driverClassName: string;
    url: string;
    initialize: boolean;
}
export interface SysPermissionConditions extends Conditions {
}
export interface SysRoleConditions extends Conditions {
}
export interface SysUserConditions extends Conditions {
}
export interface SysAttributeConditions extends Conditions {
}
export interface SysDefaultRoleConditions extends Conditions {
}
export interface SysElementConditions extends Conditions {
    path: string;
    title: string;
}
export interface SysTenantDataSourceConditions extends Conditions {
    tenantId: string;
}
export type SysPermissionProps = keyof SysPermissionEntity;
export type SysRoleProps = keyof SysRoleEntity;
export type SysUserProps = keyof SysUserEntity;
export type SysAttributeProps = keyof SysAttributeEntity;
export type SysDefaultRoleProps = keyof SysDefaultRoleEntity;
export type SysElementProps = keyof SysElementEntity;
export type SysTenantDataSourceProps = keyof SysTenantDataSourceEntity;
