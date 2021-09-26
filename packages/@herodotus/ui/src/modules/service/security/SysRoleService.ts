import { BaseService, BaseSysEntity, _constants } from '@/lib/declarations';
import { Singleton } from 'typescript-ioc';
import { SysAuthority } from './SysAuthorityService';

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
}
