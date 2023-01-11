import type { AxiosHttpResult, Page, Pagination, BpmnListEntity, BpmnListQueryParams, BpmnPathParams, BpmnPagination, BpmnSortable } from '../../declarations';
import { Service } from './core';
export declare abstract class BpmnService extends Service {
    protected getCountAddress(): string;
    protected createAddressWithParam(params: BpmnPathParams, operation?: string): string;
    protected createRelationAddress(id: string, operation: string, otherId?: string): string;
}
export declare abstract class BpmnQueryByGetService<R extends BpmnListEntity, P extends BpmnListQueryParams, B> extends BpmnService {
    getCount(params?: P): Promise<number>;
    getList(pagination: BpmnPagination<B>, count: number, params?: P): Promise<Page<R>>;
    getByPage(pagination: BpmnPagination<B>, params?: P): Promise<Page<R>>;
}
export declare abstract class BpmnQueryService<R extends BpmnListEntity, P extends BpmnListQueryParams, B> extends BpmnQueryByGetService<R, P, B> {
    get(id: string): Promise<AxiosHttpResult<R>>;
}
export declare abstract class BpmnQueryByPostService<R extends BpmnListEntity, P extends BpmnListQueryParams, B> extends BpmnQueryService<R, P, B> {
    getPostCount(params?: P): Promise<number>;
    getPostList(pagination: Pagination, count: number, sorting?: BpmnSortable<B>[], params?: P): Promise<Page<R>>;
    getPostByPage(pagination: Pagination, sorting?: BpmnSortable<B>[], params?: P): Promise<Page<R>>;
}
export declare abstract class BaseBpmnService<R extends BpmnListEntity, P extends BpmnListQueryParams, B> extends BpmnQueryByPostService<R, P, B> {
    delete(id: string): Promise<AxiosHttpResult<string>>;
}
