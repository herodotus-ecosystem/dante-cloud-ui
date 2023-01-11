import type { AxiosHttpResult, Page, Pagination, BpmnListEntity, BpmnListQueryParams, BpmnPathParams, BpmnBaseDeleteQueryParams, BpmnPagination, BpmnSortable } from '../../declarations';
import { Service } from './core';
export declare abstract class BpmnService extends Service {
    protected getCountAddress(): string;
    protected createAddressWithParam(params: BpmnPathParams, operation?: string): string;
}
export declare abstract class BpmnReadListService<R extends BpmnListEntity, P extends BpmnListQueryParams, B> extends BpmnService {
    private getCount;
    private getList;
    getByPage(pagination: BpmnPagination<B>, params?: P): Promise<Page<R>>;
}
export declare abstract class BpmnReadService<R extends BpmnListEntity, P extends BpmnListQueryParams, B> extends BpmnReadListService<R, P, B> {
    get(id: string): Promise<AxiosHttpResult<R>>;
}
export declare abstract class BpmnReadListByPostService<R extends BpmnListEntity, P extends BpmnListQueryParams, B> extends BpmnReadService<R, P, B> {
    getPostCount(params?: P): Promise<number>;
    getPostList(pagination: Pagination, count: number, sorting?: BpmnSortable<B>[], params?: P): Promise<Page<R>>;
    getPostByPage(pagination: Pagination, sorting?: BpmnSortable<B>[], params?: P): Promise<Page<R>>;
}
export declare abstract class BaseBpmnService<R extends BpmnListEntity, P extends BpmnListQueryParams, B> extends BpmnReadListByPostService<R, P, B> {
    abstract deleteById(id: string, query: BpmnBaseDeleteQueryParams): Promise<AxiosHttpResult<string>>;
}
