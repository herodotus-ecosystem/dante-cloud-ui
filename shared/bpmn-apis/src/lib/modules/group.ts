import type {
  AxiosHttpResult,
  IdPathParams,
  Group,
  GroupQueryParams,
  GroupSortBy,
  GroupCreateBody,
  GroupUpdateBody
} from '/@/declarations';

import { HttpConfig, BpmnService, BaseBpmnService } from '../base';

class GroupService extends BaseBpmnService<Group, GroupQueryParams, GroupSortBy> {
  private static instance: GroupService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): GroupService {
    if (this.instance == null) {
      this.instance = new GroupService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getBpmn() + '/group';
  }

  public getCreateAddress(): string {
    return this.getBaseAddress() + '/create';
  }

  /**
   * Creates a new group.
   *
   * @param data {@link GroupCreateBody}
   * @returns This method returns no content
   */
  public createTask(data: GroupCreateBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().post<string, GroupCreateBody>(this.getCreateAddress(), data);
  }

  /**
   * Updates a group.
   *
   * @param data {@link GroupUpdateBody}
   * @returns This method returns no content
   */
  public updateTask(path: IdPathParams, data: GroupUpdateBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().put<string, GroupUpdateBody>(this.createAddressWithParam(path), data);
  }
}

class GroupMemberService extends BpmnService {
  private static instance: GroupMemberService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): GroupMemberService {
    if (this.instance == null) {
      this.instance = new GroupMemberService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getBpmn() + '/group';
  }

  private getRelationAddress(groupId: string, userId: string = '') {
    return this.createRelationAddress(groupId, 'members', userId);
  }

  /**
   * Adds a member to a group.
   *
   * @param groupId
   * @param userId
   * @returns This method returns no content
   */
  public create(groupId: string, userId: string): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().put<string, string>(this.getRelationAddress(groupId, userId), '');
  }

  /**
   * Removes a member from a group.
   *
   * @param groupId
   * @param userId
   * @returns This method returns no content
   */
  public delete(groupId: string, userId: string): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().delete<string, string>(this.getRelationAddress(groupId, userId));
  }
}

export { GroupService, GroupMemberService };
