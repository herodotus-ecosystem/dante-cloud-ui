import { BaseSysEntity, BaseService, _constants } from '@/lib/declarations';
import { Singleton } from 'typescript-ioc';

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
}

@Singleton
export class SysOrganizationService extends BaseService<SysOrganization> {
    public getBaseAddress(): string {
        return _constants.UPMS_ADDRESS + '/organization';
    }
}
