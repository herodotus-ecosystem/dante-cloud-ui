import type { AxiosHttpResult, BpmnIdPathParams, TenantEntity, TenantQueryParams, TenantSortBy, TenantCreateRequestBody, TenantUpdateRequestBody } from '../../declarations';
import { HttpConfig, BpmnQueryService, BpmnService } from '../base';
declare class TenantService extends BpmnQueryService<TenantEntity, TenantQueryParams, TenantSortBy> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): TenantService;
    getBaseAddress(): string;
    getCreateAddress(): string;
    /**
     * Create a new tenant.
     *
     * @param data {@link TenantCreateRequestBody}
     * @returns This method returns no content
     */
    createTenant(data: TenantCreateRequestBody): Promise<AxiosHttpResult<string>>;
    /**
     * Updates a tenant.
     *
     * @param data {@link TenantUpdateRequestBody}
     * @returns This method returns no content
     */
    updateTenant(path: BpmnIdPathParams, data: TenantUpdateRequestBody): Promise<AxiosHttpResult<string>>;
}
declare class TenantUserService extends BpmnService {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): TenantUserService;
    getBaseAddress(): string;
    private getRelationAddress;
    /**
     * Adds a member to a group.
     *
     * @param tenantId
     * @param userId
     * @returns This method returns no content
     */
    create(tenantId: string, userId: string): Promise<AxiosHttpResult<string>>;
    /**
     * Removes a member from a group.
     *
     * @param tenantId
     * @param userId
     * @returns This method returns no content
     */
    delete(tenantId: string, userId: string): Promise<AxiosHttpResult<string>>;
}
declare class TenantGroupService extends BpmnService {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): TenantGroupService;
    getBaseAddress(): string;
    private getRelationAddress;
    /**
     * Adds a member to a group.
     *
     * @param tenantId
     * @param groupId
     * @returns This method returns no content
     */
    create(tenantId: string, groupId: string): Promise<AxiosHttpResult<string>>;
    /**
     * Removes a member from a group.
     *
     * @param tenantId
     * @param groupId
     * @returns This method returns no content
     */
    delete(tenantId: string, groupId: string): Promise<AxiosHttpResult<string>>;
}
export { TenantService, TenantUserService, TenantGroupService };
