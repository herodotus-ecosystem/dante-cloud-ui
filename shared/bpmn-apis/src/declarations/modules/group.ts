import { BpmnBaseEntity, BpmnListQueryParams } from '../base';

export interface Group extends BpmnBaseEntity {
  /**
   * The id of the group.
   */
  id: string;
  /**
   * The name of the group.
   */
  name: string;
  /**
   * The type of the group.
   */
  type: string;
}

export type GroupSortBy = 'id' | 'name' | 'type';

export interface GroupQueryParams extends BpmnListQueryParams {
  /**
   * Filter by the id of the group.
   */
  id?: string;
  /**
   * Filter by a comma-separated list of group ids.
   */
  idIn?: string;
  /**
   * Filter by the name of the group.
   */
  name?: string;
  /**
   * Filter by the name that the parameter is a substring of.
   */
  nameLike?: string;
  /**
   * Filter by the type of the group.
   */
  type?: string;
  /**
   * Only retrieve groups which the given user id is a member of.
   */
  member?: string;
  /**
   * Only retrieve groups which are members of the given tenant.
   */
  memberOfTenant?: string;
}

export interface GroupCreateBody extends Group {}

export interface GroupUpdateBody extends Group {}
