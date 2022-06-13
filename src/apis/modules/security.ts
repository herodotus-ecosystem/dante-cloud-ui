import type { SysAuthority, SysDefaultRole, SysRole, SysSecurityAttribute, SysUser, AxiosHttpResult } from '/@/lib/declarations';

import { ContentTypeEnum } from '/@/lib/enums';

import { BaseService } from '../base';
import { service, http } from '/@/lib/utils';

class SysAuthorityService extends BaseService<SysAuthority> {
	private static instance = new SysAuthorityService();

	private static UPMS_SYS_AUTHORITY = service.getUpms() + '/authority';
	private static UPMS_SYS_AUTHORITY_TREE = this.UPMS_SYS_AUTHORITY + '/tree';
	private static UPMS_SYS_AUTHORITY_API = this.UPMS_SYS_AUTHORITY + '/apis';

	private constructor() {
		super();
	}

	public static getInstance(): SysAuthorityService {
		return this.instance;
	}

	public getBaseAddress(): string {
		return SysAuthorityService.UPMS_SYS_AUTHORITY;
	}
}

class SysDefaultRoleService extends BaseService<SysDefaultRole> {
	private static instance = new SysDefaultRoleService();

	private constructor() {
		super();
	}

	public static getInstance(): SysDefaultRoleService {
		return this.instance;
	}

	public getBaseAddress(): string {
		return service.getUpms() + '/default-role';
	}
}

class SysRoleService extends BaseService<SysRole> {
	private static instance = new SysRoleService();

	private constructor() {
		super();
	}

	public static getInstance(): SysRoleService {
		return this.instance;
	}

	public getBaseAddress(): string {
		return service.getUpms() + '/role';
	}

	public getRoleCodePath(roleCode: string): string {
		return this.getParamPath(this.getBaseAddress(), roleCode);
	}

	public fetchByRoleCode(roleCode: string): Promise<AxiosHttpResult<SysRole>> {
		return http.get<SysRole, string>(this.getRoleCodePath(roleCode));
	}
}

class SysSecurityAttributeService extends BaseService<SysSecurityAttribute> {
	private static instance = new SysSecurityAttributeService();

	private constructor() {
		super();
	}

	public static getInstance(): SysSecurityAttributeService {
		return this.instance;
	}

	public getBaseAddress(): string {
		return service.getUpms() + '/security-attribute';
	}
}

class SysUserService extends BaseService<SysUser> {
	private static instance = new SysUserService();

	private constructor() {
		super();
	}

	public static getInstance(): SysUserService {
		return this.instance;
	}

	public getBaseAddress(): string {
		return service.getUpms() + '/user';
	}

	public getUsernameAddress(): string {
		return this.getBaseAddress() + '/sign-in';
	}

	public getChangePasswordAddress(): string {
		return this.getBaseAddress() + '/change-password';
	}

	public getUsernamePath(username: string): string {
		return this.getParamPath(this.getUsernameAddress(), username);
	}

	public fetchByUsername(username: string): Promise<AxiosHttpResult<SysUser>> {
		return http.get<SysUser, string>(this.getUsernamePath(username));
	}

	public changePassword(data: Dictionary<string>): Promise<AxiosHttpResult<SysUser>> {
		return http.put<SysUser, Dictionary<string>>(this.getChangePasswordAddress(), data, {
			contentType: ContentTypeEnum.URL_ENCODED,
		});
	}
}

export function useSecurityApi() {
	return {
		authority: SysAuthorityService.getInstance(),
		defaultRole: SysDefaultRoleService.getInstance(),
		securityAttribute: SysSecurityAttributeService.getInstance(),
		role: SysRoleService.getInstance(),
		user: SysUserService.getInstance(),
	};
}
