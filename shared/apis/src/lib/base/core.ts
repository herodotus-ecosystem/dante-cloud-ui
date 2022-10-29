import { Base64, lodash, moment } from '@herodotus/utils';
import type { Axios } from '/@/declarations';

class ApiConfig {
  private http = {} as Axios;
  private project = '';
  private clientId = '';
  private clientSecret = '';
  private oidc = false;
  private uaaAddress = '';
  private upmsAddress = '';
  private bpmnAddress = '';
  private cmdbAddress = '';

  public constructor(project: string, clientId: string, clientSecret: string, oidc: boolean, http: Axios) {
    this.project = project;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.http = http;
    this.oidc = oidc;
    this.switch(project);
  }
  private switch(type: string) {
    switch (type) {
      case 'dante':
        this.uaaAddress = '/dante-cloud-uaa';
        this.upmsAddress = '/dante-cloud-upms';
        this.bpmnAddress = '/dante-cloud-bpmn-ability/engine-rest';
        this.cmdbAddress = '/dante-cloud-cmdb-ability';
        break;
      case 'herodotus':
        this.uaaAddress = '/herodotus-cloud-uaa';
        this.upmsAddress = '/herodotus-cloud-upms';
        this.bpmnAddress = '/herodotus-cloud-bpmn-ability/engine-rest';
        this.cmdbAddress = '/herodotus-cloud-cmdb-ability';
        break;
      default:
        this.uaaAddress = '';
        this.upmsAddress = '';
        this.bpmnAddress = '/engine-rest';
        this.cmdbAddress = '';
    }
  }

  public getProject(): string {
    return this.project;
  }

  public getClientSecret(): string {
    return this.clientSecret;
  }

  public getClientId(): string {
    return this.clientId;
  }

  public isOidc(): boolean {
    return this.oidc;
  }

  public getHttp(): Axios {
    return this.http;
  }

  public getUaa(): string {
    return this.uaaAddress;
  }

  public getUpms(): string {
    return this.upmsAddress;
  }

  public getBpmn(): string {
    return this.bpmnAddress;
  }

  public getCmdb(): string {
    return this.cmdbAddress;
  }
}

abstract class Service {
  private config: ApiConfig;

  public constructor(config: ApiConfig) {
    this.config = config;
  }

  abstract getBaseAddress(): string;

  protected getConfig(): ApiConfig {
    return this.config;
  }

  protected getParamPath(path: string, param: string): string {
    return path + '/' + param;
  }

  protected getIdPath(id: string): string {
    return this.getParamPath(this.getBaseAddress(), id);
  }
}

export { Base64, lodash, moment, ApiConfig, Service };
