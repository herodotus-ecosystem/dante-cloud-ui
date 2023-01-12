import type { Entity, Conditions, Pagination } from '@herodotus/core';
export interface BpmnParams extends Conditions {
}
export interface BpmnEntity extends Entity {
}
export interface BpmnPathParams extends BpmnParams {
}
export interface BpmnQueryParams extends BpmnParams {
}
export interface BpmnRequestBody extends Entity {
}
export interface BpmnUnionPathParams extends BpmnPathParams {
    id?: string;
    key?: string;
    tenantId?: string;
}
export interface BpmnRelationPathParams extends BpmnPathParams {
    id: string;
    relationId: string;
    action: string;
}
export interface BpmnListEntity extends BpmnEntity {
}
export interface BpmnListCountEntity extends BpmnEntity {
    count: number;
}
export interface BpmnListQueryParams extends BpmnQueryParams {
}
export interface BpmnPageable {
    firstResult: number;
    maxResults: number;
}
export interface BpmnSortable<B> {
    sortBy: B;
    sortOrder: 'asc' | 'desc';
}
export declare type BpmnPagination<B> = BpmnSortable<B> & Pagination;
export interface BpmnOrQueries extends BpmnParams {
}
export interface BpmnPostGet<Q extends BpmnOrQueries, B> extends Conditions {
    /**
     * A JSON array of nested historic process instance queries with OR semantics.
     * A process instance matches a nested query if it fulfills at least one of the query's predicates.
     * With multiple nested queries, a process instance must fulfill at least one predicate of each query (Conjunctive Normal Form).
     *
     * All process instance query properties can be used except for: sorting
     * See the user guide for more information about OR queries.
     */
    orQueries?: Array<Q>;
    sorting?: Array<BpmnSortable<B>>;
}
export declare type BpmnGetListParams<P extends BpmnListQueryParams, B> = P & BpmnSortable<B> & BpmnPageable;
export declare type BpmnPostListParams<P extends BpmnListQueryParams, Q extends BpmnOrQueries, B> = P & BpmnPostGet<Q, B>;
