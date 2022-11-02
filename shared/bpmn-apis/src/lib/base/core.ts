import type { BpmnPathParams } from '/@/declarations';

import { lodash } from '/@/lib/utils';

export { Axios, HttpConfig, Service } from '@herodotus/core';

export class PathParamBuilder {
  private address;
  private operation = '';
  private id = '';
  private key = '';
  private tenantId = '';

  constructor(address: string) {
    this.address = address;
  }

  public setOperation(operation: string): PathParamBuilder {
    this.operation = operation;
    return this;
  }

  public setId(id: string): PathParamBuilder {
    this.id = id;
    return this;
  }

  public setKey(key: string): PathParamBuilder {
    this.key = key;
    return this;
  }

  public setTenantId(tenantId: string): PathParamBuilder {
    this.tenantId = tenantId;
    return this;
  }

  public withParam(param: BpmnPathParams): PathParamBuilder {
    this.id = param.id as string;
    this.key = param.key as string;
    this.tenantId = param.tenantId as string;
    return this;
  }

  public build(): string {
    let result = this.address;
    if (lodash.endsWith(result, '/')) {
      result = lodash.trimEnd(result, '/');
    }

    if (this.id) {
      result += '/' + this.id;
    } else {
      if (this.key) {
        result += '/key/' + this.key;
      }

      if (this.tenantId) {
        result += '/tenant-id/' + this.tenantId;
      }
    }

    if (this.operation) {
      result += '/' + this.operation;
    }

    return result;
  }
}
