import type { BpmnUnionPathParams } from '/@/declarations';

import { lodash } from './core';

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

  public withParam(param: BpmnUnionPathParams): PathParamBuilder {
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

export class RelationPathParamBuilder {
  private address;
  private operation = '';
  private id = '';
  private otherId = '';

  constructor(address: string) {
    this.address = address;
  }

  public setOperation(operation: string): RelationPathParamBuilder {
    this.operation = operation;
    return this;
  }

  public setId(id: string): RelationPathParamBuilder {
    this.id = id;
    return this;
  }

  public setOtherId(otherId: string): RelationPathParamBuilder {
    this.otherId = otherId;
    return this;
  }

  public withParam(id: string, operation: string, otherId: string = ''): RelationPathParamBuilder {
    this.id = id;
    this.operation = operation;
    this.otherId = otherId;
    return this;
  }

  public build(): string {
    let result = this.address;
    if (lodash.endsWith(result, '/')) {
      result = lodash.trimEnd(result, '/');
    }

    if (this.id) {
      result += '/' + this.id;
    }

    if (this.operation) {
      result += '/' + this.operation;
    }

    if (this.otherId) {
      result += '/' + this.otherId;
    }

    return result;
  }
}
