import { Axios } from './axios';
import { lodash } from '../utils';

class HttpConfig {
  private http = {} as Axios;
  private project = '';
  private clientId = '';
  private clientSecret = '';
  private oidc = false;
  private uaaAddress = '';
  private upmsAddress = '';
  private msgAddress = '';
  private ossAddress = '';
  private bpmnAddress = '';
  private cmdbAddress = '';
  private proxy = '';

  public constructor(
    project: string,
    clientId: string,
    clientSecret: string,
    http: Axios,
    oidc = false,
    proxy = '/api',
  ) {
    this.project = project;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.http = http;
    this.oidc = oidc;
    this.proxy = proxy;
    this.switch(project);
  }
  private switch(type: string) {
    switch (type) {
      case 'dante':
        this.uaaAddress = '/dante-cloud-uaa';
        this.upmsAddress = '/dante-cloud-upms';
        this.msgAddress = '/dante-cloud-message';
        this.ossAddress = '/dante-cloud-oss-ability';
        this.bpmnAddress = '/dante-cloud-bpmn-ability/engine-rest';
        this.cmdbAddress = '/dante-cloud-cmdb-ability';
        break;
      case 'herodotus':
        this.uaaAddress = '/herodotus-cloud-uaa';
        this.upmsAddress = '/herodotus-cloud-upms';
        this.msgAddress = '/herodotus-cloud-message';
        this.ossAddress = '/herodotus-cloud-oss-ability';
        this.bpmnAddress = '/herodotus-cloud-bpmn-ability/engine-rest';
        this.cmdbAddress = '/herodotus-cloud-cmdb-ability';
        break;
      default:
        this.uaaAddress = '';
        this.upmsAddress = '';
        this.msgAddress = '';
        this.ossAddress = '';
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

  public getProxy(): string {
    return this.proxy;
  }

  public getHttp(): Axios {
    return this.http;
  }

  private processProxy(content: string, withProxy: boolean = true): string {
    if (withProxy) {
      return this.proxy + content;
    } else {
      return content;
    }
  }

  public getUaa(withProxy: boolean = true): string {
    return this.processProxy(this.uaaAddress, withProxy);
  }

  public getUpms(withProxy: boolean = true): string {
    return this.processProxy(this.upmsAddress, withProxy);
  }

  public getMsg(withProxy: boolean = true): string {
    return this.processProxy(this.msgAddress, withProxy);
  }

  public getOss(withProxy: boolean = true): string {
    return this.processProxy(this.ossAddress, withProxy);
  }

  public getBpmn(withProxy: boolean = true, isExtended: boolean = false): string {
    let result = this.processProxy(this.bpmnAddress, withProxy);
    if (isExtended) {
      return lodash.replace(result, 'engine-rest', 'camunda-extended');
    } else {
      return result;
    }
  }

  public getCmdb(withProxy: boolean = true): string {
    return this.processProxy(this.cmdbAddress, withProxy);
  }
}

export { HttpConfig };
