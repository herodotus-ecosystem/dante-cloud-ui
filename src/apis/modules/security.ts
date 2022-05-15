import type { SysAuthority } from '/@/lib/declarations';

import { BaseService } from '../base';
import { service } from '/@/lib/utils';

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

export function useSecurityApi() {
	return {
		authority: SysAuthorityService.getInstance(),
	};
}
