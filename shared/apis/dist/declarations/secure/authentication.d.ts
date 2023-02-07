import { SocialSourceEnum } from '../../enums';
export type SocialSource = keyof typeof SocialSourceEnum;
export interface AccessPrincipal {
    code?: string;
    appId?: string;
    encryptedData?: string;
    iv?: string;
    openId?: string;
    sessionKey?: string;
    unionId?: string;
    rawData?: string;
    signature?: string;
    auth_code?: string;
    state?: string;
    authorization_code?: string;
    oauth_token?: string;
    oauth_verifier?: string;
    mobile?: string;
}
