import { Singleton } from 'typescript-ioc';
import { SysAuthority } from '../security/SysAuthorityService';
import { BaseSysEntity, BaseService, _constants } from '@/lib/declarations';

export interface OauthScopes extends BaseSysEntity {
    scopeId: string;
    scopeCode: string;
    scopeName: string;
    authorities: Set<SysAuthority>;
}

@Singleton
export class OauthScopesService extends BaseService<OauthScopes> {
    public getBaseAddress(): string {
        return _constants.UPMS_ADDRESS + '/authorize/scopes';
    }
}
