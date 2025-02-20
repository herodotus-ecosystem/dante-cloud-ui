import { SysPermissionEntity, SysRoleEntity, SysUserEntity, SysAttributeEntity, SysDefaultRoleEntity, SysElementEntity, AxiosHttpResult, SysTenantDataSourceEntity } from '../../declarations';
import { HttpConfig, BaseService } from '../base';
declare class SysPermissionService extends BaseService<SysPermissionEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysPermissionService;
    getBaseAddress(): string;
}
declare class SysRoleService extends BaseService<SysRoleEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysRoleService;
    getBaseAddress(): string;
    getRoleCodePath(roleCode: string): string;
    fetchByRoleCode(roleCode: string): Promise<AxiosHttpResult<SysRoleEntity>>;
}
declare class SysUserService extends BaseService<SysUserEntity> {
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
declare class SysAttributeService extends BaseService<SysAttributeEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysAttributeService;
    getBaseAddress(): string;
}
declare class SysDefaultRoleService extends BaseService<SysDefaultRoleEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysDefaultRoleService;
    getBaseAddress(): string;
}
declare class SysElementService extends BaseService<SysElementEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysElementService;
    getBaseAddress(): string;
    fetchById(id: string): Promise<AxiosHttpResult<SysElementEntity>>;
}
declare class SysTenantDataSourceService extends BaseService<SysTenantDataSourceEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysTenantDataSourceService;
    getBaseAddress(): string;
    getTenantIdPath(tenantId: string): string;
    fetchByTenantId(tenantId: string): Promise<AxiosHttpResult<SysTenantDataSourceEntity>>;
}
export { SysPermissionService, SysRoleService, SysUserService, SysAttributeService, SysDefaultRoleService, SysElementService, SysTenantDataSourceService, };
