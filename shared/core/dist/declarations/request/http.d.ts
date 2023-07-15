import { HttpMethodEnum } from '../../enums';
export type HttpMethod = keyof typeof HttpMethodEnum;
export type Result<T = unknown> = {
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
export interface Token {
    license: string;
    openid: string;
    scope: string;
    token_type: string;
}
export interface OAuth2Token extends Token {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    id_token: string;
}
export interface OAuth2IdToken extends Token {
    roles: Array<string>;
    employeeId: string;
    avatar: string;
    client_id: string;
    active: boolean;
    sub: string;
    iss: string;
    aud: Array<string>;
    nbf: number;
    exp: number;
    iat: number;
    jti: string;
}
export type HttpResult<T = unknown> = OAuth2Token & Result<T> & T[] & T & unknown;
