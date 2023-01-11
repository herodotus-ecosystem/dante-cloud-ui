import type { BpmnPathParams } from '../../declarations';
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
export declare class RelationPathParamBuilder {
    private address;
    private operation;
    private id;
    private otherId;
    constructor(address: string);
    setOperation(operation: string): RelationPathParamBuilder;
    setId(id: string): RelationPathParamBuilder;
    setOtherId(otherId: string): RelationPathParamBuilder;
    withParam(id: string, operation: string, otherId?: string): RelationPathParamBuilder;
    build(): string;
}
