import type { Entity, Conditions, Pagination } from '@herodotus/core';

export interface BpmnBaseParams extends Conditions {}

export interface BpmnBaseEntity extends Entity {}

export interface BpmnBasePathParams extends BpmnBaseParams {}

export interface BpmnBaseQueryParams extends BpmnBaseParams {}

export interface BpmnPathParams extends BpmnBasePathParams {
  id?: string;
  key?: string;
  tenantId?: string;
}

export interface IdPathParams extends BpmnBasePathParams {
  id: string;
}

export interface BpmnListEntity extends BpmnBaseEntity {}

export interface BpmnListCountEntity extends BpmnBaseEntity {
  count: number;
}

export interface BpmnListQueryParams extends BpmnBaseQueryParams {}

export interface BpmnPageable {
  firstResult: number;
  maxResults: number;
}
export interface BpmnSortable<B> {
  sortBy: B;
  sortOrder: 'asc' | 'desc';
}

export type BpmnPagination<B> = BpmnSortable<B> & Pagination;

export interface BpmnOrQueries extends BpmnBaseParams {}

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

export type BpmnGetListParams<P extends BpmnListQueryParams, B> = P & BpmnSortable<B> & BpmnPageable;

export type BpmnPostListParams<P extends BpmnListQueryParams, Q extends BpmnOrQueries, B> = P & BpmnPostGet<Q, B>;
