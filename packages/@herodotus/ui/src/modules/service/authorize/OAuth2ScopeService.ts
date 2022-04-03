import { Singleton } from 'typescript-ioc';
import { BaseSysEntity, BaseService, _constants, RestResponse } from '@/lib/declarations';
import { OAuth2Authority } from './OAuth2AuthorityService';
import { _http, HttpContentType } from '@/lib/utils';

export interface OAuth2Scope extends BaseSysEntity {
    scopeId: string;
    scopeCode: string;
    scopeName: string;
    authorities: Set<OAuth2Authority>;
}

@Singleton
export class OAuth2ScopeService extends BaseService<OAuth2Scope> {
    public getBaseAddress(): string {
        return _constants.UAA_ADDRESS + '/authorize/scope';
    }

    public authorize(data: any): Promise<RestResponse<OAuth2Scope>> {
        return _http.put(this.getBaseAddress(), data, HttpContentType.JSON);
    }
}
