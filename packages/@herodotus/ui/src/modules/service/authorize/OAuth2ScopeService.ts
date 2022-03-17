import { Singleton } from 'typescript-ioc';
import { BaseSysEntity, BaseService, _constants } from '@/lib/declarations';

export interface OAuth2Scope extends BaseSysEntity {
    scopeId: string;
    scopeCode: string;
    scopeName: string;
}

@Singleton
export class OAuth2ScopeService extends BaseService<OAuth2Scope> {
    public getBaseAddress(): string {
        return _constants.UAA_ADDRESS + '/authorize/scope';
    }
}
