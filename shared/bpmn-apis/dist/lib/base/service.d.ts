import type { AxiosHttpResult, Page, Pagination, BpmnListEntity, BpmnListQueryParams, BpmnPathParams, BpmnBaseDeleteQueryParams } from '../../declarations';
import { Service } from './core';
export declare abstract class BaseBpmnService<R extends BpmnListEntity, P extends BpmnListQueryParams> extends Service {
    private getCountAddress;
    private getListAddress;
    protected createAddressWithParam(params: BpmnPathParams, operation?: string): string;
    private getCount;
    private getPostCount;
    private getList;
    private getPostList;
    getByPage(pagination: Pagination, params?: P): Promise<Page<R>>;
    getByPageOnPost(pagination: Pagination, params?: P): Promise<Page<R>>;
    getById(id: string): Promise<AxiosHttpResult<R>>;
    abstract deleteById(id: string, query: BpmnBaseDeleteQueryParams): Promise<AxiosHttpResult<string>>;
}
