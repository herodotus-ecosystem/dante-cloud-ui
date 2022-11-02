import type { SysAuthority, SysDefaultRole, SysRole, SysSecurityAttribute, SysUser, SysElement, AxiosHttpResult } from '../../declarations';
import { HttpConfig, BaseService } from '../base';
declare class SysAuthorityService extends BaseService<SysAuthority> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysAuthorityService;
    getBaseAddress(): string;
}
declare class SysDefaultRoleService extends BaseService<SysDefaultRole> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysDefaultRoleService;
    getBaseAddress(): string;
}
declare class SysRoleService extends BaseService<SysRole> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysRoleService;
    getBaseAddress(): string;
    getRoleCodePath(roleCode: string): string;
    fetchByRoleCode(roleCode: string): Promise<AxiosHttpResult<SysRole>>;
}
declare class SysSecurityAttributeService extends BaseService<SysSecurityAttribute> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysSecurityAttributeService;
    getBaseAddress(): string;
}
declare class SysUserService extends BaseService<SysUser> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysUserService;
    getBaseAddress(): string;
    getUsernameAddress(): string;
    getChangePasswordAddress(): string;
    getUsernamePath(username: string): string;
    fetchByUsername(username: string): Promise<AxiosHttpResult<SysUser>>;
    changePassword(userId: string, password: string): Promise<AxiosHttpResult<SysUser>>;
}
declare class SysElementService extends BaseService<SysElement> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysElementService;
    getBaseAddress(): string;
    fetchById(id: string): Promise<AxiosHttpResult<SysElement>>;
}
export { SysAuthorityService, SysDefaultRoleService, SysElementService, SysSecurityAttributeService, SysRoleService, SysUserService };
