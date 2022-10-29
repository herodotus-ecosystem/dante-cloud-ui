import { Base64, lodash, moment } from '@herodotus/utils';
import type { Axios } from '../../declarations';
declare class ApiConfig {
    private http;
    private project;
    private clientId;
    private clientSecret;
    private oidc;
    private uaaAddress;
    private upmsAddress;
    private bpmnAddress;
    private cmdbAddress;
    constructor(project: string, clientId: string, clientSecret: string, oidc: boolean, http: Axios);
    private switch;
    getProject(): string;
    getClientSecret(): string;
    getClientId(): string;
    isOidc(): boolean;
    getHttp(): Axios;
    getUaa(): string;
    getUpms(): string;
    getBpmn(): string;
    getCmdb(): string;
}
declare abstract class Service {
    private config;
    constructor(config: ApiConfig);
    abstract getBaseAddress(): string;
    protected getConfig(): ApiConfig;
    protected getParamPath(path: string, param: string): string;
    protected getIdPath(id: string): string;
}
export { Base64, lodash, moment, ApiConfig, Service };
