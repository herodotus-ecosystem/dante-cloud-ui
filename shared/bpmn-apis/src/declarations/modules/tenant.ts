import { BpmnBaseEntity, BpmnListQueryParams } from '../base';

export interface Tenant extends BpmnBaseEntity {
  /**
   * The id of the tenant.
   */
  id: string;
  /**
   * The name of the tenant.
   */
  name: string;
}

export type TenantSortBy = 'id' | ' name';

export interface TenantQueryParams extends BpmnListQueryParams {
  /**
   * Filter by the id of the tenant.
   */
  id?: string;
  /**
   * Filter by the name of the tenant.
   */
  name?: string;
  /**
   * Filter by the name that the parameter is a substring of.
   */
  nameLike?: string;
  /**
   * Select only tenants where the given user is a member of.
   */
  userMember?: string;
  /**
   * Select only tenants where the given group is a member of.
   */
  groupMember?: string;
  /**
   * Select only tenants where the user or one of his groups is a member of.
   * Can only be used in combination with the userMember parameter. Value may only be true, as false is the default behavior.
   */
  includingGroupsOfUser?: boolean;
}

export interface TenantCreateOrUpdateBody {
  /**
   * The id of the tenant.
   */
  id: string;
  /**
   * The name of the tenant.
   */
  name: string;
}

export interface TenantCreateBody extends TenantCreateOrUpdateBody {}

export interface TenantUpdateBody extends TenantCreateOrUpdateBody {}
