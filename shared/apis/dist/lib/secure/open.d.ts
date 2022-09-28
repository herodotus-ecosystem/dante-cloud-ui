import type { AxiosHttpResult, CaptchaResource, CaptchaData } from '../../declarations';
import { ApiConfig } from '../base';
declare class OpenApiService {
    private static instance;
    private config;
    private constructor();
    static getInstance(config: ApiConfig): OpenApiService;
    createSession(sessionId?: string): Promise<AxiosHttpResult>;
    exchange(sessionId: string | undefined, confidential: string): Promise<AxiosHttpResult>;
    getPrompt(username: string): Promise<AxiosHttpResult>;
    createCaptcha(sessionId: string, type: string): Promise<AxiosHttpResult<CaptchaResource>>;
    verifyCaptcha(identity: string, category: string, data: CaptchaData): Promise<AxiosHttpResult<boolean>>;
    createVerificationCode(mobile: string): Promise<AxiosHttpResult<string>>;
    getSocialList(): Promise<AxiosHttpResult<Record<string, string>>>;
}
export { OpenApiService };
