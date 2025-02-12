import type { BpmnEntity, BpmnListQueryParams } from '../base';

export interface UserEntity extends BpmnEntity {
  /**
   * The id of the user.
   */
  id: string;
  /**
   * The first name of the user.
   */
  firstName: string;
  /**
   * The last name of the user.
   */
  lastName: string;
  /**
   * The email of the user.
   */
  email: string;
}

export type UserSortBy = 'userId' | 'firstName' | 'lastName' | 'email';

export interface UserQueryParams extends BpmnListQueryParams {
  /**
   * Filter by the id of the user.
   */
  id?: string;
  /**
   * Filter by a comma-separated list of user ids.
   */
  idIn?: string;
  /**
   * Filter by the first name of the user.
   */
  firstName?: string;
  /**
   * Filter by the first name that the parameter is a substring of.
   */
  firstNameLike?: string;
  /**
   * Filter by the last name of the user.
   */
  lastName?: string;
  /**
   * Filter by the last name that the parameter is a substring of.
   */
  lastNameLike?: string;
  /**
   * Filter by the email of the user.
   */
  email?: string;
  /**
   * Filter by the email that the parameter is a substring of.
   */
  emailLike?: string;
  /**
   * Filter for users which are members of a group.
   */
  memberOfGroup?: string;
  /**
   * Filter for users which are members of the given tenant.
   */
  memberOfTenant?: string;
  /**
   * Only select Users that are potential starter for the given process definition.
   */
  potentialStarter?: string;
}

// ------------------------------ Above is Get List & Count  ------------------------------
