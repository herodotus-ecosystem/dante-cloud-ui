import { Singleton } from 'typescript-ioc';
import { OauthScopes } from './OauthScopesService';
import { BaseAppEntity, BaseService, _constants } from '@/lib/declarations';

export interface OauthApplications extends BaseAppEntity {
    appKey: string;
    appNameEn: string;
    appIcon: string;
    technologyType: number | EmptyObject;
    website: string;
    scopes: Set<OauthScopes>;
}

@Singleton
export class OauthApplicationsService extends BaseService<OauthApplications> {
    public getBaseAddress(): string {
        return _constants.UPMS_ADDRESS + '/authorize/applications';
    }
}
