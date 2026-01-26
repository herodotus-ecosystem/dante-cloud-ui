import type { HttpClientOptions } from '@/declarations';
import { Axios } from './axios';
import { replace } from 'lodash-es';

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
  private iotAddress = '';
  private manageAddress = '';
  private proxy = '';

  public constructor(http: Axios, options: HttpClientOptions) {
    this.http = http;
    this.project = options.project;
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.oidc = options.oidc ? options.oidc : false;
    this.proxy = options.proxy ? options.proxy : '/api';
    this.switch(options.project);
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
        this.iotAddress = '/dante-cloud-iot-ability';
        this.manageAddress = '/dante-cloud-manage-ability';
        break;
      case 'herodotus':
        this.uaaAddress = '/herodotus-cloud-uaa';
        this.upmsAddress = '/herodotus-cloud-upms';
        this.msgAddress = '/herodotus-cloud-message';
        this.ossAddress = '/herodotus-cloud-oss-ability';
        this.bpmnAddress = '/herodotus-cloud-bpmn-ability/engine-rest';
        this.cmdbAddress = '/herodotus-cloud-cmdb-ability';
        this.iotAddress = '/herodotus-cloud-iot-ability';
        this.manageAddress = '/herodotus-cloud-manage-ability';
        break;
      default:
        this.uaaAddress = '';
        this.upmsAddress = '';
        this.msgAddress = '';
        this.ossAddress = '';
        this.bpmnAddress = '/engine-rest';
        this.cmdbAddress = '';
        this.iotAddress = '';
        this.manageAddress = '';
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
      return replace(result, 'engine-rest', 'camunda-extended');
    } else {
      return result;
    }
  }

  public getCmdb(withProxy: boolean = true): string {
    return this.processProxy(this.cmdbAddress, withProxy);
  }

  public getIot(withProxy: boolean = true): string {
    return this.processProxy(this.iotAddress, withProxy);
  }

  public getManage(withProxy: boolean = true): string {
    return this.processProxy(this.manageAddress, withProxy);
  }
}

export { HttpConfig };
