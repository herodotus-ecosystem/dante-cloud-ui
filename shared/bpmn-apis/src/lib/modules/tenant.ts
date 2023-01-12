import type {
  AxiosHttpResult,
  BpmnIdPathParams,
  TenantEntity,
  TenantQueryParams,
  TenantSortBy,
  TenantCreateRequestBody,
  TenantUpdateRequestBody
} from '/@/declarations';

import { HttpConfig, BpmnQueryService, BpmnService } from '../base';

class TenantService extends BpmnQueryService<TenantEntity, TenantQueryParams, TenantSortBy> {
  private static instance: TenantService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): TenantService {
    if (this.instance == null) {
      this.instance = new TenantService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getBpmn() + '/tenant';
  }

  public getCreateAddress(): string {
    return this.getBaseAddress() + '/create';
  }

  /**
   * Create a new tenant.
   *
   * @param data {@link TenantCreateRequestBody}
   * @returns This method returns no content
   */
  public createTenant(data: TenantCreateRequestBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().post<string, TenantCreateRequestBody>(this.getCreateAddress(), data);
  }

  /**
   * Updates a tenant.
   *
   * @param data {@link TenantUpdateRequestBody}
   * @returns This method returns no content
   */
  public updateTenant(path: BpmnIdPathParams, data: TenantUpdateRequestBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().put<string, TenantUpdateRequestBody>(this.createAddressWithParam(path), data);
  }
}

class TenantUserService extends BpmnService {
  private static instance: TenantUserService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): TenantUserService {
    if (this.instance == null) {
      this.instance = new TenantUserService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getBpmn() + '/tenant';
  }

  private getRelationAddress(tenantId: string, userId: string = '') {
    return this.createRelationAddress(tenantId, 'user-members', userId);
  }

  /**
   * Adds a member to a group.
   *
   * @param tenantId
   * @param userId
   * @returns This method returns no content
   */
  public create(tenantId: string, userId: string): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().put<string, string>(this.getRelationAddress(tenantId, userId), '');
  }

  /**
   * Removes a member from a group.
   *
   * @param tenantId
   * @param userId
   * @returns This method returns no content
   */
  public delete(tenantId: string, userId: string): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().delete<string, string>(this.getRelationAddress(tenantId, userId));
  }
}

class TenantGroupService extends BpmnService {
  private static instance: TenantGroupService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): TenantGroupService {
    if (this.instance == null) {
      this.instance = new TenantGroupService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getBpmn() + '/tenant';
  }

  private getRelationAddress(tenantId: string, groupId: string = '') {
    return this.createRelationAddress(tenantId, 'group-members', groupId);
  }

  /**
   * Adds a member to a group.
   *
   * @param tenantId
   * @param groupId
   * @returns This method returns no content
   */
  public create(tenantId: string, groupId: string): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().put<string, string>(this.getRelationAddress(tenantId, groupId), '');
  }

  /**
   * Removes a member from a group.
   *
   * @param tenantId
   * @param groupId
   * @returns This method returns no content
   */
  public delete(tenantId: string, groupId: string): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().delete<string, string>(this.getRelationAddress(tenantId, groupId));
  }
}

export { TenantService, TenantUserService, TenantGroupService };
