import { Axios } from '../http';
declare class HttpConfig {
    private http;
    private project;
    private clientId;
    private clientSecret;
    private oidc;
    private uaaAddress;
    private upmsAddress;
    private bpmnAddress;
    private cmdbAddress;
    private msgAddress;
    private proxy;
    constructor(project: string, clientId: string, clientSecret: string, http: Axios, oidc?: boolean, proxy?: string);
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
    getMsg(): string;
}
export { HttpConfig };
