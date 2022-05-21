import { BaseService, BaseSysEntity, _constants } from '@/lib/declarations';
import { Singleton } from 'typescript-ioc';
import { OauthScopes } from '../oauth';
import { SysRole } from './SysRoleService';

export interface SysSecurityAttribute extends BaseSysEntity {
    attributeId: string;
    url: string;
    requestMethod: string;
    serviceId: string;
    attributeCode: string;
    manualSetting: string;
    ipAddress: string;
    expression: string;
    roles: Set<SysRole>;
    scopes: Set<OauthScopes>;
}

@Singleton
export class SysSecurityAttributeService extends BaseService<SysSecurityAttribute> {
    public getBaseAddress(): string {
        return _constants.UPMS_ADDRESS + '/security-attribute';
    }
}
