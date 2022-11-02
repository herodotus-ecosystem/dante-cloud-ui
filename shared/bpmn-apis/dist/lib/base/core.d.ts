import type { BpmnPathParams } from '../../declarations';
export { Axios, HttpConfig, Service } from '@herodotus/core';
export declare class PathParamBuilder {
    private address;
    private operation;
    private id;
    private key;
    private tenantId;
    constructor(address: string);
    setOperation(operation: string): PathParamBuilder;
    setId(id: string): PathParamBuilder;
    setKey(key: string): PathParamBuilder;
    setTenantId(tenantId: string): PathParamBuilder;
    withParam(param: BpmnPathParams): PathParamBuilder;
    build(): string;
}
