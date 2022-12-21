import { HttpMethodEnum } from '../../enums';
export declare type HttpMethod = keyof typeof HttpMethodEnum;
export declare type Result<T = unknown> = {
    code: number;
    message: string;
    path: string;
    data: T;
    status: number;
    timestamp: string;
    error?: {
        detail: string;
        message: string;
        code: string;
        field: string;
    };
};
export declare type OAuth2Token = {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    license: string;
    openid: string;
    scope: string;
    token_type: string;
    id_token: string;
};
export declare type OAuth2IdToken = {
    sub: string;
    openid: string;
    roles: Array<string>;
    employeeId: string;
    avatar: string;
    iss: string;
    active: boolean;
    token_type: string;
    client_id: string;
    aud: Array<string>;
    license: string;
    nbf: number;
    scope: string;
    exp: number;
    iat: number;
    jti: string;
};
export declare type HttpResult<T = unknown> = OAuth2Token & Result<T> & T[] & T & unknown;
