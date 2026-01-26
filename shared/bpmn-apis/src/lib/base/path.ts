import type { BpmnRelationPathParams, BpmnUnionPathParams } from '@/declarations';

import { endsWith, trimEnd } from 'lodash-es';

abstract class PathParamBuilder {
  private address;
  private action = '';

  constructor(address: string) {
    this.address = address;
  }

  protected getWellFormedAddress(): string {
    let result = this.address;
    if (endsWith(result, '/')) {
      return trimEnd(result, '/');
    } else {
      return result;
    }
  }

  protected addAction(action: string): void {
    this.action = action;
  }

  protected appendAction(data: string): string {
    if (this.action) {
      return data + '/' + this.action;
    } else {
      return data;
    }
  }

  abstract build(): string;
}

export class UnionPathParamBuilder extends PathParamBuilder {
  private id = '';
  private key = '';
  private tenantId = '';

  constructor(address: string) {
    super(address);
  }

  public setAction(action: string): UnionPathParamBuilder {
    this.addAction(action);
    return this;
  }

  public withParam(param: BpmnUnionPathParams): UnionPathParamBuilder {
    this.id = param.id as string;
    this.key = param.key as string;
    this.tenantId = param.tenantId as string;
    return this;
  }

  public build(): string {
    let result = this.getWellFormedAddress();

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

    return this.appendAction(result);
  }
}

export class RelationPathParamBuilder extends PathParamBuilder {
  private id = '';
  private relationId = '';

  constructor(address: string) {
    super(address);
  }

  public withParam(param: BpmnRelationPathParams): RelationPathParamBuilder {
    this.id = param.id;
    this.relationId = param.relationId;
    this.addAction(param.action);
    return this;
  }

  public build(): string {
    let result = this.getWellFormedAddress();

    result += '/' + this.id;

    result = this.appendAction(result);

    result += '/' + this.relationId;

    return result;
  }
}
