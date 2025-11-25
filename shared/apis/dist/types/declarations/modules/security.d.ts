import { AbstractSysEntity, Conditions, Entity } from '../base';
import { SysEmployeeEntity } from './hr';
export interface SysPermissionEntity extends AbstractSysEntity {
    permissionId: string;
    permissionName: string;
    permissionCode: string;
}
export interface SysRoleEntity extends AbstractSysEntity {
    roleId: string;
    roleCode: string;
    roleName: string;
    permissions: Array<SysPermissionEntity>;
}
export interface SysUserEntity extends AbstractSysEntity {
    userId: string;
    username: string;
    password: string;
    nickname: string;
    employee: SysEmployeeEntity;
    roles: Array<SysRoleEntity>;
    avatar?: string;
}
export interface SysAttributeEntity extends AbstractSysEntity {
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
export interface SysDefaultRoleEntity extends AbstractSysEntity {
    defaultId: string;
    scene: string;
    role: SysRoleEntity;
}
export interface SysElementEntity extends AbstractSysEntity {
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
export interface SysTenantDataSourceEntity extends AbstractSysEntity {
    datasourceId: string;
    tenantId: string;
    username: string;
    password: string;
    driverClassName: string;
    url: string;
    initialize: boolean;
}
export interface SysDictionaryEntity extends AbstractSysEntity {
    dictionaryId: string;
    category: string;
    value: string;
    label: string;
    name: string;
    ordinal: number;
    valueType: string;
}
export interface AccessSourceEntity extends Entity {
    id: string;
    source: string;
    description: string;
    authorizeUrl: string;
    oauth2: boolean;
    bound: boolean;
    socialId: string;
    detail: string;
    avatar: string;
    bindingTime: Date;
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
export interface SysDictionaryConditions extends Conditions {
    category: string;
    label: string;
    name: string;
}
export interface AccessSourceConditions extends Conditions {
    userId: string;
}
export type SysPermissionProps = keyof SysPermissionEntity;
export type SysRoleProps = keyof SysRoleEntity;
export type SysUserProps = keyof SysUserEntity;
export type SysAttributeProps = keyof SysAttributeEntity;
export type SysDefaultRoleProps = keyof SysDefaultRoleEntity;
export type SysElementProps = keyof SysElementEntity;
export type SysTenantDataSourceProps = keyof SysTenantDataSourceEntity;
export type SysDictionaryProps = keyof SysDictionaryEntity;
export type AccessSourceProps = keyof AccessSourceEntity;
