import { SysPermissionEntity, SysRoleEntity, SysUserEntity, SysAttributeEntity, SysDefaultRoleEntity, SysElementEntity, SysDictionaryEntity, SysTenantDataSourceEntity, AxiosHttpResult, AccessSourceEntity } from '../../declarations';
import { Elements } from '@herodotus-cloud/core';
import { HttpConfig, AbstractService } from '../base';
declare class SysPermissionService extends AbstractService<SysPermissionEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysPermissionService;
    getBaseAddress(): string;
}
declare class SysRoleService extends AbstractService<SysRoleEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysRoleService;
    getBaseAddress(): string;
    getRoleCodePath(roleCode: string): string;
    fetchByRoleCode(roleCode: string): Promise<AxiosHttpResult<SysRoleEntity>>;
}
declare class SysUserService extends AbstractService<SysUserEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysUserService;
    getBaseAddress(): string;
    getUsernameAddress(): string;
    getChangePasswordAddress(): string;
    getUsernamePath(username: string): string;
    fetchByUsername(username: string): Promise<AxiosHttpResult<SysUserEntity>>;
    changePassword(userId: string, password: string): Promise<AxiosHttpResult<SysUserEntity>>;
}
declare class SysAttributeService extends AbstractService<SysAttributeEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysAttributeService;
    getBaseAddress(): string;
}
declare class SysDefaultRoleService extends AbstractService<SysDefaultRoleEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysDefaultRoleService;
    getBaseAddress(): string;
}
declare class SysElementService extends AbstractService<SysElementEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysElementService;
    getBaseAddress(): string;
    getResourcesAddress(): string;
    fetchById(id: string): Promise<AxiosHttpResult<SysElementEntity>>;
    findResourcesByRoles(roles: string[]): Promise<AxiosHttpResult<Elements>>;
}
declare class SysTenantDataSourceService extends AbstractService<SysTenantDataSourceEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysTenantDataSourceService;
    getBaseAddress(): string;
    getTenantIdPath(tenantId: string): string;
    fetchByTenantId(tenantId: string): Promise<AxiosHttpResult<SysTenantDataSourceEntity>>;
}
declare class SysDictionaryService extends AbstractService<SysDictionaryEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysDictionaryService;
    getBaseAddress(): string;
    getItemsAddress(): string;
    getCategoryPath(category: string): string;
    fetchByCategory(category: string): Promise<AxiosHttpResult<Array<SysDictionaryEntity>>>;
    fetchCategories(categories: string): Promise<AxiosHttpResult<Record<string, Array<SysDictionaryEntity>>>>;
}
declare class SocialBindingService extends AbstractService<AccessSourceEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SocialBindingService;
    getBaseAddress(): string;
}
export { SysPermissionService, SysRoleService, SysUserService, SysAttributeService, SysDefaultRoleService, SysElementService, SysTenantDataSourceService, SysDictionaryService, SocialBindingService, };
