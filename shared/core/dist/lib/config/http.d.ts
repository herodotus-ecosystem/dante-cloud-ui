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
export { HttpConfig };
