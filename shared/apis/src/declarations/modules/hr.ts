import type { AbstractSysEntity, Conditions, Entity } from '../base';

export interface SysDepartmentEntity extends AbstractSysEntity {
  departmentId: string;
  departmentName: string;
  a4BizDeptId: string;
  bizDeptCode: string;
  bizDeptDesc: string;
  bizDeptId: string;
  bizDeptName: string;
  bizDeptType: string;
  partitionCode: string;
  shortName: string;
  parentId: string;
  organizationId: string;
}

export interface SysEmployeeEntity extends AbstractSysEntity {
  employeeId: string;
  employeeName: string;
  employeeNo: string;
  mobilePhoneNumber: string;
  officePhoneNumber: string;
  email: string;
  pkiEmail: string;
  a4BizEmpId: string;
  avatar: string;
  birthday: string;
  gender: string;
  identity: string;
  departments: Set<SysDepartmentEntity>;
}

export interface SysOrganizationEntity extends AbstractSysEntity {
  organizationId: string;
  organizationName: string;
  a4BizOrgId: string;
  bizOrgCode: string;
  bizOrgDesc: string;
  bizOrgId: string;
  bizOrgName: string;
  bizOrgType: string;
  partitionCode: string;
  shortName: string;
  parentId: string;
  category: number;
}

export interface SysOrganizationConditions extends Conditions {
  category: number;
}

export interface SysDepartmentConditions extends SysOrganizationConditions {
  organizationId: string;
}

export interface SysEmployeeConditions extends Conditions {
  employeeName: string;
  mobilePhoneNumber: string;
  email: string;
  identity: number;
  gender: number;
}

export type SysOrganizationProps = keyof SysOrganizationEntity;

export type SysDepartmentProps = keyof SysDepartmentEntity;

export type SysEmployeeProps = keyof SysEmployeeEntity;

export interface SysEmployeeAllocatable extends Entity {
  organizationId: string;
  departmentId: string;
}

export interface AllocatableDeploy extends SysEmployeeAllocatable, Conditions {
  employees: SysEmployeeEntity[];
}

export interface AllocatableRemove extends SysEmployeeAllocatable, Conditions {
  employeeId: string;
}
