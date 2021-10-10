import { BaseService, BaseSysEntity, RestResponse } from '@/lib/declarations';
import { _http, _constants, HttpContentType} from '@/lib/utils';
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

    public getUsernameAddress(): string {
        return this.getBaseAddress() + '/sign-in';
    }

    public getChangePasswordAddress(): string {
        return this.getBaseAddress() + '/change-password';
    }

    public getUsernamePath(username: string): string {
        return this.getParamPath(this.getUsernameAddress(), username);
    }

    public fetchByUsername(username: string): Promise<RestResponse<SysUser>> {
        return _http.get<SysUser>(this.getUsernamePath(username));
    }

    public changePassword(data: unknown): Promise<RestResponse<SysUser>> {
        return _http.put(this.getChangePasswordAddress(), data, HttpContentType.URL_ENCODED);
    }
}
