import type { Entity, Conditions } from '@herodotus/core';
export interface BpmnBaseParams extends Conditions {
}
export interface BpmnBaseEntity extends Entity {
}
export interface BpmnBasePathParams extends BpmnBaseParams {
}
export interface BpmnBaseQueryParams extends BpmnBaseParams {
}
export interface BpmnPathParams extends BpmnBasePathParams {
    id?: string;
    key?: string;
    tenantId?: string;
}
export interface BpmnPage extends BpmnBaseParams {
    firstResult: number;
    maxResults: number;
}
export interface BpmnSort extends BpmnBaseParams {
    sortBy: string;
    sortOrder: string;
}
export declare type BpmnPageable = BpmnPage & BpmnSort;
export interface BpmnListEntity extends BpmnBaseEntity {
}
export interface BpmnListCountEntity extends BpmnBaseEntity {
    count: number;
}
export interface BpmnListQueryParams extends BpmnBaseQueryParams {
}
export interface BpmnPostGet<Q extends BpmnBasePathParams> extends Conditions {
    /**
     * A JSON array of nested historic process instance queries with OR semantics.
     * A process instance matches a nested query if it fulfills at least one of the query's predicates.
     * With multiple nested queries, a process instance must fulfill at least one predicate of each query (Conjunctive Normal Form).
     *
     * All process instance query properties can be used except for: sorting
     * See the user guide for more information about OR queries.
     */
    orQueries?: Array<Q>;
    sorting: BpmnSort;
}
export declare type BpmnGetListParams<P extends BpmnListQueryParams> = P & BpmnPageable;
export declare type BpmnPostListParams<P extends BpmnListQueryParams, Q extends BpmnBasePathParams> = P & BpmnPostGet<Q>;
export declare type DefaultBpmnListParams<P extends BpmnListQueryParams, Q extends BpmnBasePathParams> = BpmnGetListParams<P> | BpmnPostListParams<P, Q>;
