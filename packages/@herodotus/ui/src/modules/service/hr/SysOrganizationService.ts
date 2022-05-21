import { BaseSysEntity, BaseService, RestResponse } from '@/lib/declarations';
import { Singleton } from 'typescript-ioc';
import { _http, _constants } from '@/lib/utils';

export interface SysOrganization extends BaseSysEntity {
    organizationId: string;
    organizationName: string;
    a4BizOrgId: string;
    bizOrgCode: string;
    bizOrgDesc: string;
    bizOrgId: string;
    bizOrgName: string;
    bizOrgType: string;
    partitionCode: string;
    shortName: string;
    parentId: string;
    category: number | string | EmptyObject;
}

@Singleton
export class SysOrganizationService extends BaseService<SysOrganization> {
    public getBaseAddress(): string {
        return _constants.UPMS_ADDRESS + '/organization';
    }

    public getTreeAddress(): string {
        return this.getBaseAddress() + '/tree';
    }

    public fetchTree(params: Dictionary<string> = {}): Promise<RestResponse<SysOrganization[]>> {
        return _http.get<SysOrganization[]>(this.getTreeAddress(), params);
    }
}
