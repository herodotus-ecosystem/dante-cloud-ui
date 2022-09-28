import type { BaseSysEntity, Conditions, Entity, EmptyObject } from '../base';

export interface SysDepartment extends BaseSysEntity {
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

export interface SysEmployee extends BaseSysEntity {
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
  gender: number | EmptyObject;
  identity: number | EmptyObject;
  departments: Set<SysDepartment>;
}

export interface SysOrganization extends BaseSysEntity {
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

export interface SysEmployeeAllocatable extends Entity {
  organizationId: string;
  departmentId: string;
}

export interface AllocatableDeploy extends SysEmployeeAllocatable, Conditions {
  employees: SysEmployee[];
}

export interface AllocatableRemove extends SysEmployeeAllocatable, Conditions {
  employeeId: string;
}
