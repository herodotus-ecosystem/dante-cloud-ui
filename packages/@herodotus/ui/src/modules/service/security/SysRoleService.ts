import { BaseService, BaseSysEntity, _constants, RestResponse } from '@/lib/declarations';
import { Singleton } from 'typescript-ioc';
import { SysAuthority } from './SysAuthorityService';
import { _http } from '@/lib/utils';

export interface SysRole extends BaseSysEntity {
    roleId: string;
    roleCode: string;
    roleName: string;
    authorities: Set<SysAuthority>;
}

@Singleton
export class SysRoleService extends BaseService<SysRole> {
    public getBaseAddress(): string {
        return _constants.UPMS_ADDRESS + '/role';
    }

    public getRoleCodePath(roleCode: string): string {
        return this.getParamPath(this.getBaseAddress(), roleCode);
    }

    public fetchByRoleCode(roleCode: string): Promise<RestResponse<SysRole>> {
        return _http.get<SysRole>(this.getRoleCodePath(roleCode));
    }
}
