import { BaseSysEntity } from '@/lib/declarations';

export interface OAuth2Authority extends BaseSysEntity {
    authorityId: string;
    authorityCode: string;
    serviceId: string;
    requestMethod: string;
    url: string;
}
