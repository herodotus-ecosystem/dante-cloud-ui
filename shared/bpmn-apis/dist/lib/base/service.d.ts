import { AxiosHttpResult, Page, Pagination, BpmnListEntity, BpmnListQueryParams, BpmnPagination, BpmnSortable, BpmnDeleteQueryParams, BpmnUnionPathParams } from '../../declarations';
import { Service } from './core';

export declare abstract class BpmnService<D extends BpmnDeleteQueryParams = BpmnDeleteQueryParams> extends Service {
    protected getCountAddress(): string;
    protected createAddressByParam(params: BpmnUnionPathParams, action?: string): string;
    protected createAddressByRelation(id: string, relationId: string, action: string): string;
    protected createAddressById(id: string, action?: string): string;
    delete(id: string, deleteParams?: D): Promise<AxiosHttpResult<string>>;
}
export declare abstract class BpmnQueryByGetService<E extends BpmnListEntity, Q extends BpmnListQueryParams, S, D extends BpmnDeleteQueryParams = BpmnDeleteQueryParams> extends BpmnService<D> {
    getCount(params?: Q): Promise<number>;
    getList(pagination: BpmnPagination<S>, count: number, params?: Q): Promise<Page<E>>;
    getByPage(pagination: BpmnPagination<S>, params?: Q): Promise<Page<E>>;
    getAll(sortable: BpmnSortable<S>, params?: Q): Promise<Array<E>>;
}
export declare abstract class BpmnQueryService<E extends BpmnListEntity, Q extends BpmnListQueryParams, S, D extends BpmnDeleteQueryParams = BpmnDeleteQueryParams> extends BpmnQueryByGetService<E, Q, S, D> {
    get(id: string): Promise<AxiosHttpResult<E>>;
}
export declare abstract class BpmnQueryByPostService<E extends BpmnListEntity, Q extends BpmnListQueryParams, S, D extends BpmnDeleteQueryParams = BpmnDeleteQueryParams> extends BpmnQueryService<E, Q, S, D> {
    getPostCount(params?: Q): Promise<number>;
    getPostList(pagination: Pagination, count: number, sorting?: Array<BpmnSortable<S>>, params?: Q): Promise<Page<E>>;
    getPostByPage(pagination: Pagination, sorting?: Array<BpmnSortable<S>>, params?: Q): Promise<Page<E>>;
}
export declare abstract class BaseBpmnService<E extends BpmnListEntity, Q extends BpmnListQueryParams, S, D extends BpmnDeleteQueryParams = BpmnDeleteQueryParams> extends BpmnQueryByPostService<E, Q, S, D> {
}
