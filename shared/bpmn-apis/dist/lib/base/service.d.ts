import type { AxiosHttpResult, Page, Pagination, BpmnListEntity, BpmnListQueryParams, BpmnPathParams, BpmnBaseDeleteQueryParams, BpmnPagination, BpmnSortable } from '../../declarations';
import { Service } from './core';
export declare abstract class BaseBpmnService<R extends BpmnListEntity, P extends BpmnListQueryParams, B> extends Service {
    private getCountAddress;
    protected createAddressWithParam(params: BpmnPathParams, operation?: string): string;
    private getCount;
    private getPostCount;
    private getList;
    private getPostList;
    getByPage(pagination: BpmnPagination<B>, params?: P): Promise<Page<R>>;
    getByPageOnPost(pagination: Pagination, sorting?: BpmnSortable<B>[], params?: P): Promise<Page<R>>;
    getById(id: string): Promise<AxiosHttpResult<R>>;
    abstract deleteById(id: string, query: BpmnBaseDeleteQueryParams): Promise<AxiosHttpResult<string>>;
}
