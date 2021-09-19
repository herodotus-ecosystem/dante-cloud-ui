import { OauthApplications } from './OauthApplicationsService';
import { Singleton } from 'typescript-ioc';
import { Entity, BaseService, _constants } from '@/lib/declarations';

export interface OauthClientDetails extends Entity {
    client_id: string;
    client_secret: string;
    resource_ids: string;
    scope: string;
    authorized_grant_types: string;
    web_server_redirect_uri: string;
    authorities: string;
    access_token_validity: number;
    refresh_token_validity: number;
    additional_information: OauthApplications;
    autoapprove: string;
    redirect_uri: string;
}

@Singleton
export class OauthClientDetailsService extends BaseService<OauthClientDetails> {
    public getBaseAddress(): string {
        return _constants.UPMS_ADDRESS + '/authorize/client-details';
    }
}
