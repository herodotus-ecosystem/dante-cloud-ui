import { BpmnRelationPathParams, BpmnUnionPathParams } from '../../declarations';

declare abstract class PathParamBuilder {
    private address;
    private action;
    constructor(address: string);
    protected getWellFormedAddress(): string;
    protected addAction(action: string): void;
    protected appendAction(data: string): string;
    abstract build(): string;
}
export declare class UnionPathParamBuilder extends PathParamBuilder {
    private id;
    private key;
    private tenantId;
    constructor(address: string);
    setAction(action: string): UnionPathParamBuilder;
    withParam(param: BpmnUnionPathParams): UnionPathParamBuilder;
    build(): string;
}
export declare class RelationPathParamBuilder extends PathParamBuilder {
    private id;
    private relationId;
    constructor(address: string);
    withParam(param: BpmnRelationPathParams): RelationPathParamBuilder;
    build(): string;
}
export {};
