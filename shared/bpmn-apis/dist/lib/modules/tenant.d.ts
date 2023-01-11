import type { AxiosHttpResult, IdPathParams, Tenant, TenantQueryParams, TenantSortBy, TenantCreateBody, TenantUpdateBody } from '../../declarations';
import { HttpConfig, BpmnQueryService, BpmnService } from '../base';
declare class TenantService extends BpmnQueryService<Tenant, TenantQueryParams, TenantSortBy> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): TenantService;
    getBaseAddress(): string;
    getCreateAddress(): string;
    /**
     * Create a new tenant.
     *
     * @param data {@link TenantCreateBody}
     * @returns This method returns no content
     */
    createTenant(data: TenantCreateBody): Promise<AxiosHttpResult<string>>;
    /**
     * Updates a tenant.
     *
     * @param data {@link TenantUpdateBody}
     * @returns This method returns no content
     */
    updateTenant(path: IdPathParams, data: TenantUpdateBody): Promise<AxiosHttpResult<string>>;
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
