import type { Axios } from '../../declarations';
declare class ApiConfig {
    private http;
    private project;
    private clientId;
    private clientSecret;
    private uaaAddress;
    private upmsAddress;
    private bpmnAddress;
    private cmdbAddress;
    constructor(project: string, clientId: string, clientSecret: string, http: Axios);
    private switch;
    getProject(): string;
    getClientSecret(): string;
    getClientId(): string;
    getHttp(): Axios;
    getUaa(): string;
    getUpms(): string;
    getBpmn(): string;
    getCmdb(): string;
}
export { ApiConfig };
