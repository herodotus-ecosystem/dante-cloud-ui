import { Singleton } from 'typescript-ioc';
import { BaseService, BaseSysEntity, _constants, RestResponse } from '@/lib/declarations';
import { SysRole } from './SysRoleService';

export interface SysDefaultRole extends BaseSysEntity {
    defaultId: string;
    scene: number | EmptyObject;
    role: SysRole;
}

@Singleton
export class SysDefaultRoleService extends BaseService<SysDefaultRole> {
    public getBaseAddress(): string {
        return _constants.UPMS_ADDRESS + '/default-role';
    }
}
