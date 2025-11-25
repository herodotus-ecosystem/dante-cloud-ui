import { HttpConfig, AxiosHttpResult } from '@herodotus-cloud/core';
import { CaptchaResource, CaptchaData, Session, SignInErrorStatus } from '../../declarations';
export declare class OpenApiService {
    private static instance;
    private config;
    private constructor();
    static getInstance(config: HttpConfig): OpenApiService;
    createSession(sessionId?: string): Promise<AxiosHttpResult<Session>>;
    exchange(sessionId: string | undefined, publicKey: string): Promise<AxiosHttpResult<string>>;
    getPrompt(username: string): Promise<AxiosHttpResult<SignInErrorStatus>>;
    createCaptcha(sessionId: string, type: string): Promise<AxiosHttpResult<CaptchaResource>>;
    verifyCaptcha(identity: string, category: string, data: CaptchaData): Promise<AxiosHttpResult<boolean>>;
    createVerificationCode(mobile: string): Promise<AxiosHttpResult<string>>;
    getSocialList(): Promise<AxiosHttpResult<Record<string, string>>>;
}
