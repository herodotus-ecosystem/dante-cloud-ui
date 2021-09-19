import { _http } from '@/lib/utils';
import { BaseService, BaseSysEntity, RestResponse, _constants } from '@/lib/declarations';
import { Singleton } from 'typescript-ioc';

export enum AuthorityType {
    API,
    MENU,
    PAGE,
    MINI_PAGE,
}

export interface SysAuthority extends BaseSysEntity {
    authorityId: string;
    authorityCode: string;
    authorityName: string;
    requestMethod: string;
    authorityType: AuthorityType;
    serviceId: string;
    className: string;
    methodName: string;
    url: string;
    menuClass: string;
    parentId: string;
}

@Singleton
export class SysAuthorityService extends BaseService<SysAuthority> {
    private UPMS_SYS_AUTHORITY = _constants.UPMS_ADDRESS + '/authority';
    private UPMS_SYS_AUTHORITY_TREE = this.UPMS_SYS_AUTHORITY + '/tree';
    private UPMS_SYS_AUTHORITY_API = this.UPMS_SYS_AUTHORITY + '/apis';

    public getBaseAddress(): string {
        return this.UPMS_SYS_AUTHORITY;
    }

    public fetchAuthorityTree(): Promise<RestResponse<SysAuthority[]>> {
        return _http.get(this.UPMS_SYS_AUTHORITY_TREE);
    }

    public fetchAuthorityApis(): Promise<RestResponse<SysAuthority[]>> {
        return _http.get(this.UPMS_SYS_AUTHORITY_API);
    }
}
