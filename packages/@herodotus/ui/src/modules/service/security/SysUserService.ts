import { BaseService, BaseSysEntity, _constants } from '@/lib/declarations';
import { Singleton } from 'typescript-ioc';
import { SysRole } from './SysRoleService';

export interface SysUser extends BaseSysEntity {
    userId: string;
    userName: string;
    password: string;
    ickName: string;
    employeeId: string;
    roles: Set<SysRole>;
}

@Singleton
export class SysUserService extends BaseService<SysUser> {
    public getBaseAddress(): string {
        return _constants.UPMS_ADDRESS + '/user';
    }
}
