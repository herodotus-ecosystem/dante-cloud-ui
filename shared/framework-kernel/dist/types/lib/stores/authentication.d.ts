import { AccessTokenResponse } from '@herodotus-cloud/core';
import { SignInErrorStatus, SocialSource, AccessPrincipal } from '../../declarations';
export declare const useAuthenticationStore: import('pinia').StoreDefinition<"Authentication", {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    license: string;
    openid: string;
    idToken: string;
    scope: string;
    token_type: string;
    errorTimes: number;
    remainTimes: number;
    locked: boolean;
    userId: string;
    username: string;
    employeeId: string;
    avatar: string;
    roles: Array<string>;
}, {
    isNotExpired: (state: {
        access_token: string;
        expires_in: number;
        refresh_token: string;
        license: string;
        openid: string;
        idToken: string;
        scope: string;
        token_type: string;
        errorTimes: number;
        remainTimes: number;
        locked: boolean;
        userId: string;
        username: string;
        employeeId: string;
        avatar: string;
        roles: Array<string>;
    } & import('pinia').PiniaCustomStateProperties<{
        access_token: string;
        expires_in: number;
        refresh_token: string;
        license: string;
        openid: string;
        idToken: string;
        scope: string;
        token_type: string;
        errorTimes: number;
        remainTimes: number;
        locked: boolean;
        userId: string;
        username: string;
        employeeId: string;
        avatar: string;
        roles: Array<string>;
    }>) => boolean;
    token(): string;
}, {
    getBearerToken(): string;
    getAuthorizationHeader(): Record<string, string>;
    saveAccessToken(data: AccessTokenResponse): void;
    setUserErrorStatus(data: SignInErrorStatus): void;
    /**
     * 判断是否是以非弹窗的形式显示的信息。
     *
     * 主要在登录页面中，将 Dialog 弹出形式的错误信息，转换为显示在输入框上部的错误信息，
     * @param error
     * @returns
     */
    isAlertMessage(error: any): boolean;
    setErrorPrompt(error: any, principal: string): void;
    signIn(username: string, password: string): Promise<boolean>;
    refreshToken(): Promise<boolean>;
    signOut(): void;
    authorizationCode(code: string, state?: string): Promise<boolean>;
    smsSignIn(mobile: string, code: string): Promise<boolean>;
    socialSignIn(source: SocialSource, accessPrincipal: AccessPrincipal): Promise<boolean>;
}>;
